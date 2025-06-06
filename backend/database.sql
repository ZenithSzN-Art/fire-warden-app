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