# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Copy project files for dependency caching
COPY APITestPilot/*.csproj ./APITestPilot/
COPY APITestPilot.Application/*.csproj ./APITestPilot.Application/
COPY APITestPilot.Domain/*.csproj ./APITestPilot.Domain/
COPY APITestPilot.Infrastructure/*.csproj ./APITestPilot.Infrastructure/

# Restore dependencies
RUN dotnet restore APITestPilot/APITestPilot.csproj

# Copy source code
COPY . .

# Publish application
RUN dotnet publish APITestPilot/APITestPilot.csproj \
    -c Release \
    --no-restore \
    -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS=8080

ENV ASPNETCORE_ENVIRONMENT=Development

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "APITestPilot.dll"]
