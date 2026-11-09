# Backend DevOps Handover Documentation
**Project:** API Test Pilot - Backend Service  
**Service Type:** ASP.NET Core Web API  
**Target Runtime:** .NET 10.0 (`net10.0`, C# 14)  
**Database:** Microsoft SQL Server 2022+  
**Location:** `/backend`

---

## 1. Executive Summary & Architecture

The **API Test Pilot Backend** serves as the central orchestration and persistence API of the platform. It handles OpenAPI/Swagger specification parsing, manages projects, users, test suites, test runs, test case executions, and results, and provides secure authentication (Local + Google Firebase).

### Architectural Pattern: Clean Architecture + CQRS
The solution is organized into 4 layered projects:

```
backend/
├── APITestPilot/               # Presentation / Web API Host (Controllers, Program.cs, Swagger/Scalar)
│   └── APITestPilot.slnx       # Solution configuration file
├── APITestPilot.Application/   # Application Core (CQRS Commands, Handlers, DTOs, Validators, Interfaces)
├── APITestPilot.Domain/        # Domain Models (Entities, Enums, Value Objects)
├── APITestPilot.Infrastructure/# Infrastructure (EF Core DbContext, Migrations, Identity & Firebase)
├── Firebase/                   # Firebase service account credential JSON files
└── Dockerfile                  # Multi-stage container build definition
```

### Core Dependencies
- **Runtime:** .NET 10 SDK (`10.0.x`) / ASP.NET Core Runtime 10.0
- **CQRS & Validation:** `MediatR` (v14.3.0), `FluentValidation.DependencyInjectionExtensions` (v12.2.0)
- **Authentication & Security:** 
  - `Microsoft.AspNetCore.Authentication.JwtBearer` (v10.0.14)
  - `FirebaseAdmin` (v3.7.0) — Google Firebase Admin SDK
  - `BCrypt.Net-Next` (v4.2.0) — Password hashing
- **ORM & Data:** Entity Framework Core 10.0.13 (`Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Design`, `Microsoft.Data.SqlClient`)
- **API Spec & Documentation:** `Microsoft.AspNetCore.OpenApi`, `Scalar.AspNetCore` (v2.18.2), `Swashbuckle.AspNetCore.SwaggerGen/UI` (v10.3.1)

---

## 2. Environment Variables & Configuration

The application uses standard ASP.NET Core configuration providers. In containerized/cloud environments, configuration keys are overridden using environment variables (using double-underscores `__` as hierarchy separators).

| Environment Variable | appsettings.json Key | Default / Dev Value | Description |
|---|---|---|---|
| `ASPNETCORE_ENVIRONMENT` | N/A | `Development` | Runtime mode: `Development`, `Staging`, or `Production`. Controls Swagger/Scalar exposure. |
| `ASPNETCORE_HTTP_PORTS` | N/A | `8080` | Port on which the Kestrel server listens inside the container. |
| `ConnectionStrings__DefaultConnection` | `ConnectionStrings:DefaultConnection` | `Server=.;Database=APITestPilot;...` | SQL Server connection string. **Must be provided in staging/prod**. |
| `Jwt__SecretKey` | `Jwt:SecretKey` | *(Base64 secret)* | HMAC-SHA256 signing key (min 64 chars / 256 bits). **Must be kept secure in production**. |
| `Jwt__Issuer` | `Jwt:Issuer` | `APITestPilot` | JWT token issuer claim. |
| `Jwt__Audience` | `Jwt:Audience` | `APITestPilot.Client` | JWT token audience claim. |
| `Jwt__AccessTokenMinutes` | `Jwt:AccessTokenMinutes` | `15` | Lifetime of access tokens in minutes. |
| `Jwt__RefreshTokenDays` | `Jwt:RefreshTokenDays` | `7` | Lifetime of refresh tokens in days. |
| `Firebase__CredentialsPath` | `Firebase:CredentialsPath` | `Firebase/api-test-pilot-af81c-firebase-adminsdk-fbsvc-e3785adaf3.json` | Path to the Firebase Admin service account JSON file. |
| `GOOGLE_APPLICATION_CREDENTIALS` | N/A | *(Optional)* | Standard Google Cloud env var. Can be used instead of `Firebase__CredentialsPath`. |
| `Logging__LogLevel__Default` | `Logging:LogLevel:Default` | `Information` | Log output verbosity (`Information`, `Warning`, `Error`, `Debug`). |
| `Logging__LogLevel__Microsoft.AspNetCore` | `Logging:LogLevel:Microsoft.AspNetCore` | `Warning` | Framework logging verbosity. |
| `AllowedHosts` | `AllowedHosts` | `*` | Host header filtering. |

### Sample Production Connection String
```text
Server=sqlserver,1433;Database=APITestPilot;User Id=sa;Password=<STRONG_PASSWORD>;TrustServerCertificate=True;Encrypt=True;
```

---

## 3. Database & EF Core Migrations

The database persistence is managed via **Entity Framework Core 10** targeting **Microsoft SQL Server**.

### Migration Files
All migrations are located under `APITestPilot.Infrastructure/Persistence/Migrations/`:
- `20261021075706_InitialCreate`
- `20261021114654_InitialCreateV2.0`
- `20261022074446_IntialCreateV2_1`
- `20261022095924_IntialCreateV2.2`
- `20261022100254_IntialCreateV2.3`
- `20261106013500_AddRefreshTokens` *(Adds RefreshTokens table & User.FirebaseUid)*

### Migration Commands for DevOps / CI/CD

#### A. Generate Idempotent SQL Migration Script (Recommended for CD)
To generate an idempotent SQL script that can be safely run during release pipelines:
```bash
dotnet ef migrations script \
  --project APITestPilot.Infrastructure/APITestPilot.Infrastructure.csproj \
  --startup-project APITestPilot/APITestPilot.csproj \
  --idempotent \
  --output migrations.sql
```

#### B. Direct Database Update (Dev / Staging)
```bash
dotnet ef database update \
  --project APITestPilot.Infrastructure/APITestPilot.Infrastructure.csproj \
  --startup-project APITestPilot/APITestPilot.csproj \
  --connection "$ConnectionStrings__DefaultConnection"
```

#### C. Self-Contained Migration Bundle (Cloud-Native Best Practice)
You can produce a standalone executable migration bundle that runs before the backend container starts:
```bash
dotnet ef migrations bundle \
  --project APITestPilot.Infrastructure/APITestPilot.Infrastructure.csproj \
  --startup-project APITestPilot/APITestPilot.csproj \
  --output efbundle
# Execute against the database:
./efbundle --connection "$ConnectionStrings__DefaultConnection"
```

---

## 4. Containerization & Docker Setup

### Dockerfile Specifications
The backend includes a multi-stage `Dockerfile` in the root of `/backend`:
- **Build Stage:** `mcr.microsoft.com/dotnet/sdk:10.0` (compiles and publishes Release binary).
- **Runtime Stage:** `mcr.microsoft.com/dotnet/aspnet:10.0` (lean, lightweight runtime).
- **Default Exposed Port:** `8080`.
- **Entrypoint:** `["dotnet", "APITestPilot.dll"]`.

### Building and Running the Docker Image

```bash
# 1. Build Docker image (run from the backend directory)
docker build -t api-test-pilot-backend:latest .

# 2. Run container standalone with mounted Firebase credentials
docker run -d \
  --name apitestpilot-backend \
  -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e ConnectionStrings__DefaultConnection="Server=host.docker.internal,1433;Database=APITestPilot;User Id=sa;Password=StrongPassword123!;TrustServerCertificate=True" \
  -e Jwt__SecretKey="YOUR_PRODUCTION_SECRET_KEY_HERE" \
  -v "$(pwd)/Firebase:/app/Firebase:ro" \
  api-test-pilot-backend:latest
```

### Complete Docker Compose Deployment (Backend + SQL Server)

```yaml
version: '3.8'

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: apitestpilot-db
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=DevOps_P@ssw0rd2026!
    ports:
      - "1433:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql/data
    healthcheck:
      test: ["CMD-SHELL", "/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'DevOps_P@ssw0rd2026!' -C -Q 'SELECT 1' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: apitestpilot-backend
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ASPNETCORE_HTTP_PORTS=8080
      - ConnectionStrings__DefaultConnection=Server=sqlserver,1433;Database=APITestPilot;User Id=sa;Password=DevOps_P@ssw0rd2026!;TrustServerCertificate=True;
      - Jwt__SecretKey=tldfxRE/9n73tkK+O2MmpRj31xhBqXcZGAgc+kyhYfiGGLWjFFVYL8J7PP7UDCpZhfSpejL7nM9EUXFyJqmdig==
      - Jwt__Issuer=APITestPilot
      - Jwt__Audience=APITestPilot.Client
      - Firebase__CredentialsPath=/app/Firebase/api-test-pilot-af81c-firebase-adminsdk-fbsvc-e3785adaf3.json
    volumes:
      # Mount Firebase service account key from host into container (read-only)
      - ./backend/Firebase:/app/Firebase:ro
    depends_on:
      sqlserver:
        condition: service_healthy

volumes:
  sqlserver_data:
```

---

## 5. Build, Test & Local Execution Commands

All commands can be executed directly from the `backend/` directory:

| Task | Command |
|---|---|
| **Restore Dependencies** | `dotnet restore APITestPilot/APITestPilot.slnx` |
| **Build Solution (Debug)** | `dotnet build APITestPilot/APITestPilot.slnx` |
| **Build Solution (Release)**| `dotnet build APITestPilot/APITestPilot.slnx -c Release --no-restore` |
| **Run Unit / Integration Tests** | `dotnet test APITestPilot/APITestPilot.slnx --no-build --verbosity normal` |
| **Run API Locally** | `dotnet run --project APITestPilot/APITestPilot.csproj` |
| **Publish Pre-compiled Artifact** | `dotnet publish APITestPilot/APITestPilot.csproj -c Release -o ./publish` |

---

## 6. Endpoints, Health Checks & Observability

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Registers user with email, password, and display name. Returns backend JWT + Refresh Token. |
| `POST` | `/api/auth/login` | No | Authenticates local user via email and password. Returns backend JWT + Refresh Token. |
| `POST` | `/api/auth/firebase-login` | No | Accepts Firebase ID token, verifies with Firebase Admin SDK, upserts User, and returns backend JWT + Refresh Token. |
| `GET` | `/api/auth/me` | **Yes (Bearer JWT)** | Returns current authenticated user claims. |

### Documentation Endpoints (When `ASPNETCORE_ENVIRONMENT=Development`)
- **OpenAPI Schema:** `GET /openapi/v1.json`
- **Swagger UI:** `GET /swagger`
- **Scalar UI:** `GET /scalar/v1`

### Recommended DevOps Additions to `Program.cs`
For production-grade monitoring:
1. **Health Checks (`/healthz`):**
   ```csharp
   builder.Services.AddHealthChecks()
       .AddSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")!);
   
   app.MapHealthChecks("/healthz");
   ```
2. **CORS Policy:** Configure allowed frontend origins for cross-origin requests.
3. **Structured Logging:** Direct stdout logs to JSON format for ingestion via Fluentd/Promtail/Datadog.

---

## 7. CI/CD Pipeline Reference (GitHub Actions)

The repository currently has `.github/workflows/apitest.yml`. Below is the verified workflow configuration for backend CI:

```yaml
name: Backend CI/CD

on:
  push:
    branches: ["main"]
    paths:
      - 'backend/**'
      - '.github/workflows/apitest.yml'
  pull_request:
    branches: ["main"]
    paths:
      - 'backend/**'

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup .NET SDK
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: "10.0.x"

      - name: Restore Dependencies
        run: dotnet restore APITestPilot/APITestPilot.slnx

      - name: Build Solution
        run: dotnet build APITestPilot/APITestPilot.slnx -c Release --no-restore

      - name: Run Tests
        run: dotnet test APITestPilot/APITestPilot.slnx --no-build --verbosity normal

      - name: Set up Docker Buildx
        if: github.ref == 'refs/heads/main'
        uses: docker/setup-buildx-action@v3

      - name: Build Backend Docker Image
        if: github.ref == 'refs/heads/main'
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: false # Set to true when registry secrets are added
          tags: apitestpilot-backend:latest
```

---

## 8. Summary Checklist for DevOps

- [x] Solution builds with **.NET 10.0 SDK** (0 errors, 0 warnings).
- [x] Multi-stage **Dockerfile** provided and verified.
- [x] Database migrations up-to-date including `20261106013500_AddRefreshTokens`.
- [x] Container port standard set to **8080** via `ASPNETCORE_HTTP_PORTS`.
- [x] Configuration overrides defined via `ConnectionStrings__DefaultConnection` & `ASPNETCORE_ENVIRONMENT`.
- [x] JWT Authentication & Token settings documented (`Jwt__SecretKey`, `Jwt__Issuer`, `Jwt__Audience`).
- [x] Firebase Admin credentials documented: mount `./backend/Firebase` to `/app/Firebase` (or set `GOOGLE_APPLICATION_CREDENTIALS`).
- [ ] DevOps to configure target SQL Server instance and secrets management in deployment pipelines.
- [ ] DevOps to integrate Docker Compose / Kubernetes manifests with the Frontend and AI services.
