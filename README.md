# Docker Setup for Notes Application

This Docker setup runs the complete Notes application stack with:
- SQL Server database with automatic schema creation
- ASP.NET Core backend API
- Vue.js frontend
- Nginx reverse proxy for routing

## Prerequisites
- Docker and Docker Compose installed
- .NET 8.0 SDK (for local development)
- Node.js 18+ (for local development)

## Quick Start

1. Build and start all containers:
```bash
docker-compose up --build
```

2. Access the application:
- Web App: http://localhost
- API: http://localhost/api
- SQL Server: localhost:1433

## Detailed Configuration

### Services

1. **Database (SQL Server)**
   - Container name: `notes-db`
   - Port: 1433
   - Credentials: sa / YourStrong!Passw0rd
   - Automatically creates database and tables

2. **Backend API**
   - Container name: `notes-api`
   - Internal port: 80
   - Accessed via: http://localhost/api

3. **Frontend**
   - Container name: `notes-web`
   - Internal port: 80 (port 8080 is exposed but not used)
   - Accessed via: http://localhost

4. **Nginx Proxy**
   - Container name: `notes-proxy`
   - Routes /api to backend
   - Routes / to frontend
   - Main entry point: http://localhost

### Configuration Files

1. **Frontend Environment** (.env)
```
VITE_API_URL=http://localhost
```

2. **Backend Configuration** (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=database;Database=NotesDB;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True;"
  }
}
```

### Networking
All services are on a custom network called `notes-network` which allows them to communicate using service names.

### Volumes
- `sqldata`: Persists SQL Server data

## Troubleshooting

1. **Database connection errors**: Wait for database to fully start (check with `docker-compose logs database`)

2. **Port conflicts**: If port 80 or 1433 are in use, modify docker-compose.yml
   ```yaml
   ports:
     - "8080:80"  # Change port 80 to 8080
   ```

3. **Frontend can't connect to API**: Check that nginx-proxy is running and frontend.env is correctly set

4. **Permission issues**: Run with sudo if needed
   ```bash
   sudo docker-compose up --build
   ```

## Stopping the Application

```bash
docker-compose down
```

To remove all data:
```bash
docker-compose down -v
```

## Development Mode

For development with hot reload, use:
```bash
docker-compose -f docker-compose.dev.yml up
```
