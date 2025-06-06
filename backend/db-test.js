// This script tests the connection to the Azure SQL database
require('dotenv').config();
const { poolPromise, sql } = require('./db');

async function testConnection() {
  try {
    // Try to connect to the database
    console.log('Attempting to connect to database...');
    console.log('Connection config:', {
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      // Password is hidden for security
    });
    
    const pool = await poolPromise;
    console.log('Database connection successful!');

    // Try a simple query to verify further
    const result = await pool.request().query('SELECT 1 as testValue');
    console.log('Test query result:', result.recordset[0]);

    // Try to query the FireWardens table (if it exists)
    try {
      console.log('Checking for FireWardens table...');
      const wardenResult = await pool.request().query('SELECT TOP 1 * FROM FireWardens');
      
      if (wardenResult.recordset.length > 0) {
        console.log('FireWardens table exists and contains data:', wardenResult.recordset[0]);
      } else {
        console.log('FireWardens table exists but contains no data');
      }
    } catch (tableError) {
      console.error('Error querying FireWardens table:', tableError.message);
      console.log('You may need to create the FireWardens table using the scripts in database-setup.md');
    }

    console.log('Database connection test completed successfully');
  } catch (error) {
    console.error('Database connection test failed:', error);
  } finally {
    process.exit();
  }
}

testConnection();