USE NotesDB;
GO

-- Stored Procedure for User Registration
CREATE OR ALTER PROCEDURE sp_RegisterUser
    @Username NVARCHAR(100),
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    INSERT INTO Users (Username, Email, PasswordHash, CreatedAt, UpdatedAt)
    VALUES (@Username, @Email, @PasswordHash, 
            CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME),
            CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME));
    
    SELECT SCOPE_IDENTITY() AS UserId;
END
GO

-- Stored Procedure for User Login
CREATE OR ALTER PROCEDURE sp_LoginUser
    @Email NVARCHAR(255)
AS
BEGIN
    SELECT Id, Username, Email, PasswordHash, CreatedAt
    FROM Users
    WHERE Email = @Email;
END
GO

-- Stored Procedure to Get User by ID
CREATE OR ALTER PROCEDURE sp_GetUserById
    @UserId INT
AS
BEGIN
    SELECT Id, Username, Email, CreatedAt
    FROM Users
    WHERE Id = @UserId;
END
GO

-- Stored Procedure to Create Note
CREATE OR ALTER PROCEDURE sp_CreateNote
    @Title NVARCHAR(255),
    @Content NVARCHAR(MAX),
    @UserId INT
AS
BEGIN
    INSERT INTO Notes (Title, Content, UserId, CreatedAt, UpdatedAt)
    VALUES (@Title, @Content, @UserId, 
            CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME),
            CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME));
    
    SELECT SCOPE_IDENTITY() AS NoteId;
END
GO

-- Stored Procedure to Create or Update Note
CREATE OR ALTER PROCEDURE sp_CreateOrUpdateNote
    @NoteId INT = NULL,
    @Title NVARCHAR(255),
    @Content NVARCHAR(MAX),
    @UserId INT
AS
BEGIN
    IF @NoteId IS NULL OR @NoteId = 0
    BEGIN
        -- Create new note
        INSERT INTO Notes (Title, Content, UserId, CreatedAt, UpdatedAt)
        VALUES (@Title, @Content, @UserId, 
                CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME),
                CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME));
        
        SELECT SCOPE_IDENTITY() AS NoteId, 'created' AS Operation;
    END
    ELSE
    BEGIN
        -- Update existing note
        UPDATE Notes
        SET Title = @Title,
            Content = @Content,
            UpdatedAt = CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME)
        WHERE Id = @NoteId AND UserId = @UserId;
        
        IF @@ROWCOUNT > 0
            SELECT @NoteId AS NoteId, 'updated' AS Operation;
        ELSE
            SELECT NULL AS NoteId, 'not_found' AS Operation;
    END
END
GO

-- Stored Procedure to Get User Notes
CREATE OR ALTER PROCEDURE sp_GetUserNotes
    @UserId INT
AS
BEGIN
    SELECT Id, Title, Content, CreatedAt, UpdatedAt
    FROM Notes
    WHERE UserId = @UserId
    ORDER BY UpdatedAt DESC;
END
GO

-- Stored Procedure to Get Note by ID
CREATE OR ALTER PROCEDURE sp_GetNoteById
    @NoteId INT,
    @UserId INT
AS
BEGIN
    SELECT Id, Title, Content, CreatedAt, UpdatedAt
    FROM Notes
    WHERE Id = @NoteId AND UserId = @UserId;
END
GO

-- Stored Procedure to Update Note
CREATE OR ALTER PROCEDURE sp_UpdateNote
    @NoteId INT,
    @Title NVARCHAR(255),
    @Content NVARCHAR(MAX),
    @UserId INT
AS
BEGIN
    UPDATE Notes
    SET Title = @Title,
        Content = @Content,
        UpdatedAt = CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'SE Asia Standard Time' AS DATETIME)
    WHERE Id = @NoteId AND UserId = @UserId;
    
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- Stored Procedure to Delete Note
CREATE OR ALTER PROCEDURE sp_DeleteNote
    @NoteId INT,
    @UserId INT
AS
BEGIN
    DELETE FROM Notes
    WHERE Id = @NoteId AND UserId = @UserId;
    
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- Stored Procedure to Search Notes
CREATE OR ALTER PROCEDURE sp_SearchNotes
    @UserId INT,
    @SearchTerm NVARCHAR(255) = NULL
AS
BEGIN
    SELECT Id, Title, Content, CreatedAt, UpdatedAt
    FROM Notes
    WHERE UserId = @UserId
    AND (@SearchTerm IS NULL OR 
         Title LIKE '%' + @SearchTerm + '%' OR 
         Content LIKE '%' + @SearchTerm + '%')
    ORDER BY UpdatedAt DESC;
END
GO