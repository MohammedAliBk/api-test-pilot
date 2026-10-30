# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy all project files to restore dependencies
COPY APITestPilot/*.csproj ./APITestPilot/
COPY APITestPilot.Application/*.csproj ./APITestPilot.Application/
COPY APITestPilot.Domain/*.csproj ./APITestPilot.Domain/
COPY APITestPilot.Infrastructure/*.csproj ./APITestPilot.Infrastructure/

# Restore dependencies for the main entry point project
RUN dotnet restore APITestPilot/APITestPilot.csproj

# Copy the rest of the source code
COPY . .

# Publish the application
RUN dotnet publish APITestPilot/APITestPilot.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "APITestPilot.dll"]
