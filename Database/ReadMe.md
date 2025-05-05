# Database Setup

## Prerequisites
- SQL Server 2019 or later
- SQL Server Management Studio (SSMS)

## Setup Instructions

1. Open SQL Server Management Studio and connect to your SQL Server instance.

2. Execute the scripts in the following order:
   - `1_CreateDatabase.sql`
   - `2_CreateTables.sql`
   - `3_CreateStoredProcedures.sql`

3. Update the connection string in the backend `appsettings.json` file.

## Database Schema

### Users Table
- `Id` (int, identity, primary key)
- `Username` (nvarchar(100), unique)
- `Email` (nvarchar(255), unique)
- `PasswordHash` (nvarchar(255))
- `CreatedAt` (datetime)

### Notes Table
- `Id` (int, identity, primary key)
- `Title` (nvarchar(255))
- `Content` (nvarchar(max))
- `UserId` (int, foreign key to Users)
- `CreatedAt` (datetime)
- `UpdatedAt` (datetime)

## Security Notes
- Passwords are hashed using BCrypt
- User sessions are managed with JWT tokens
- All database connections use parameterized queries to prevent SQL injection