-- Create database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'NotesDB')
BEGIN
    CREATE DATABASE NotesDB;
END
GO

-- Use the database
USE NotesDB;
GO

-- Set database options
ALTER DATABASE NotesDB SET RECOVERY SIMPLE;
ALTER DATABASE NotesDB SET READ_COMMITTED_SNAPSHOT ON;
GO