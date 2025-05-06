#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start up
echo "Waiting for SQL Server to start..."
sleep 30s

# Run the SQL scripts
echo "Running database initialization scripts..."

# Set up SQLCMD connection information
export SQLCMDSERVER=localhost
export SQLCMDUSER=sa
export SQLCMDPASSWORD=Lean@311291
export SQLCMDBUFFERSIZE=10000

# Execute SQL scripts in order
echo "Creating database..."
/opt/mssql-tools/bin/sqlcmd -i /usr/src/app/scripts/1_CreateDatabase.sql

echo "Creating tables..."
/opt/mssql-tools/bin/sqlcmd -d NotesDB -i /usr/src/app/scripts/2_CreateTables.sql

echo "Creating stored procedures..."
/opt/mssql-tools/bin/sqlcmd -d NotesDB -i /usr/src/app/scripts/3_CreateStoredProcedures.sql

echo "Database initialization complete!"

# Keep the container running
tail -f /dev/null