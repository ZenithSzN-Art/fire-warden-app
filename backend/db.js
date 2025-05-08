const sql = require("mssql");
require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true,
        trustServerCertificate: true, 
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => console.error("Database connection failed:", err));

module.exports = {
    sql,
    poolPromise,
};
// This module exports the sql library and the poolPromise object, which can be used to interact with the database.
// The poolPromise object is a promise that resolves to a connection pool, which can be used to execute SQL queries.
// The sql library is used to create and execute SQL queries.
// The config object contains the database connection details, which are loaded from environment variables.
// The poolPromise object is created by calling the connect() method on a new ConnectionPool object, which is created using the config object.
// The connect() method returns a promise that resolves to the connection pool, which is then returned by the poolPromise object.                