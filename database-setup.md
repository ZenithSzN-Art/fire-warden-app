# Fire Warden Application Database Setup

This document provides the SQL scripts needed to set up the database for the Fire Warden Management System. These scripts can be executed in Azure SQL Database through the Azure Portal Query Editor or using SQL Server Management Studio.

## Database Setup

### Create FireWardens Table

The main table to store fire warden information:

```sql
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
```

### Create Users Table (for authentication)

```sql
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
```

### Create Buildings Table (optional - for reference)

```sql
-- Create Buildings table to store the list of university locations
CREATE TABLE Buildings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    campus VARCHAR(100) NULL,
    isActive BIT NOT NULL DEFAULT 1
);

-- Create index on name for faster lookups
CREATE INDEX idx_building_name ON Buildings(name);
```

### Insert University Building Data

```sql
-- Insert the list of University of Winchester buildings
INSERT INTO Buildings (name) VALUES
('Alwyn Hall'),
('Beech Glade'),
('Bowers Building'),
('Burma Road Student Village'),
('Centre for Sport'),
('Chapel'),
('The Cottage'),
('Fred Wheeler Building'),
('Herbert Jarman Building'),
('Holm Lodge'),
('Kenneth Kettle Building'),
('King Alfred Centre'),
('Martial Rose Library'),
('Masters Lodge'),
('Medecroft'),
('Medecroft Annexe'),
('Paul Chamberlain Building'),
('Queen''s Road Student Village'),
('St Alphege'),
('St Edburga'),
('St Elizabeth''s Hall'),
('St Grimbald''s Court'),
('St James'' Hall'),
('St Swithun''s Lodge'),
('The Stripe'),
('Business School'),
('Tom Atkinson Building'),
('West Downs Centre'),
('West Downs Student Village'),
('Winton Building'),
('Students'' Union');
```

## Sample Queries

### Sample Fire Warden Data

```sql
-- Insert sample fire warden data
INSERT INTO FireWardens (staffNumber, firstName, lastName, location)
VALUES
('FW001', 'John', 'Smith', 'King Alfred Centre'),
('FW002', 'Sarah', 'Johnson', 'West Downs Centre'),
('FW003', 'Michael', 'Brown', 'Martial Rose Library'),
('FW004', 'Emma', 'Davis', 'Business School'),
('FW005', 'Robert', 'Wilson', 'The Stripe');
```

### Sample Admin User

```sql
-- Insert a sample admin user (password would be hashed in real implementation)
INSERT INTO Users (username, password, firstName, lastName, isAdmin)
VALUES ('admin', 'admin_password_hash', 'Admin', 'User', 1);
```

## Query Examples

### Get All Wardens with Their Locations

```sql
SELECT staffNumber, firstName, lastName, location, entryDateTime
FROM FireWardens
ORDER BY entryDateTime DESC;
```

### Get Wardens by Location

```sql
SELECT staffNumber, firstName, lastName, entryDateTime
FROM FireWardens
WHERE location = 'King Alfred Centre'
ORDER BY entryDateTime DESC;
```

### Update Warden Location

```sql
UPDATE FireWardens
SET location = 'West Downs Centre', entryDateTime = GETDATE()
WHERE staffNumber = 'FW001';
```

### Delete Warden Record

```sql
DELETE FROM FireWardens
WHERE staffNumber = 'FW005';
```

## Azure SQL Connection Setup

When connecting to Azure SQL Database from your Node.js application, use the following environment variables in your `.env` file:

```
DB_SERVER=your-azure-server.database.windows.net
DB_NAME=FireWardenDB
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=1433
```

## Database Maintenance

Consider implementing the following maintenance procedures:

1. Regular backups (automated with Azure SQL)
2. Periodic data archiving for old records
3. Index maintenance
4. Performance monitoring

## Security Considerations

1. Always use parameterized queries to prevent SQL injection
2. Store passwords using secure hashing algorithms (bcrypt recommended)
3. Implement row-level security if needed
4. Use Azure SQL Database firewall rules to restrict access