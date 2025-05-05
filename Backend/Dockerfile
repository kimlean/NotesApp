# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file
COPY NotesApi/NotesApi.csproj NotesApi/
RUN dotnet restore NotesApi/NotesApi.csproj

# Copy everything else
COPY NotesApi/ NotesApi/
WORKDIR /src/NotesApi
RUN dotnet build NotesApi.csproj -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish NotesApi.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

# Expose port
EXPOSE 80

# Set entrypoint
ENTRYPOINT ["dotnet", "NotesApi.dll"]