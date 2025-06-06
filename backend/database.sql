-- Create FireWardens table
CREATE TABLE FireWardens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    staffNumber VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    entryDateTime DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create index on staffNumber for faster lookups
CREATE INDEX idx_staffNumber ON FireWardens(staffNumber);

-- Create index on entryDateTime for sorting
CREATE INDEX idx_entryDateTime ON FireWardens(entryDateTime);

-- Create Users table for authentication
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    staffNumber VARCHAR(50) UNIQUE,
    isAdmin BIT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- Create index on username for faster lookups
CREATE INDEX idx_username ON Users(username);

-- Create index on staffNumber for joins with FireWardens
CREATE INDEX idx_user_staffNumber ON Users(staffNumber);