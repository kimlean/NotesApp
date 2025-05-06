USE NotesDB;
GO

-- Insert test user
-- Password hash corresponds to 'Password123!' using BCrypt
INSERT INTO Users (Username, Email, PasswordHash)
VALUES 
('kimlean', 'kimlean98@gmail.com', '$2a$12$aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdEfGhIj');

-- Insert sample notes
INSERT INTO Notes (Title, Content, UserId)
VALUES 
('First Note', 'This is a test note content.', 1),
('Shopping List', 'Milk, Eggs, Bread, Cheese', 1),
('Meeting Notes', 'Discussed project timeline and deliverables', 1);
GO