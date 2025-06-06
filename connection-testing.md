# Connection Testing Guide

This guide provides instructions for testing the connections between the different components of the Fire Warden app.

## Database Connection Testing

To test the connection to the Azure SQL Database:

1. Make sure you have set up the `.env` file in the backend directory with your Azure SQL Database credentials:

```
DB_SERVER=your-azure-server.database.windows.net
DB_NAME=FireWardenDB
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=1433
```

2. Run the database connection test script:

```bash
cd backend
node db-test.js
```

3. Look for the following output to confirm a successful connection:
   - "Database connection successful!"
   - "Test query result: { testValue: 1 }"
   - "FireWardens table exists..." (if you've already created the table)

If the connection fails, check:
- Your Azure SQL Database is properly set up and running
- Your firewall rules allow connections from your IP address
- Your credentials are correct in the `.env` file

## API Connection Testing

The API connection is tested automatically when the frontend starts. You'll see either:
- A success message in the browser console
- An error banner at the top of the page if the connection fails

To manually test the API connection:

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser's developer console to see the API test results.

## Troubleshooting Connection Issues

### Database Connection Issues

1. **Authentication Errors**:
   - Verify your SQL Server credentials
   - Check if the SQL Server allows SQL authentication

2. **Firewall Issues**:
   - Add your client IP address to the Azure SQL firewall rules
   - Ensure port 1433 is not blocked by your local firewall

3. **Missing Tables**:
   - Run the SQL scripts from `database-setup.md` to create the required tables

### API Connection Issues

1. **CORS Errors**:
   - Verify the CORS configuration in `backend/server.js`
   - Make sure the frontend URL is correctly specified

2. **404 Errors**:
   - Check that the API routes are correctly defined
   - Verify the API URL in the frontend `.env` file

3. **Backend Not Running**:
   - Make sure the backend server is running on the expected port
   - Check for any startup errors in the backend console

## Manual API Testing

You can also test the API endpoints directly using a tool like Postman:

1. GET all wardens:
   ```
   GET http://localhost:5000/api/wardens
   ```

2. GET all locations:
   ```
   GET http://localhost:5000/api/locations
   ```

3. POST new warden:
   ```
   POST http://localhost:5000/api/wardens
   Content-Type: application/json

   {
     "staffNumber": "FW001",
     "firstName": "John",
     "lastName": "Doe",
     "location": "King Alfred Centre"
   }
   ```

4. PUT update warden:
   ```
   PUT http://localhost:5000/api/wardens/FW001
   Content-Type: application/json

   {
     "firstName": "John",
     "lastName": "Doe",
     "location": "West Downs Centre"
   }
   ```

5. DELETE warden:
   ```
   DELETE http://localhost:5000/api/wardens/FW001
   ```