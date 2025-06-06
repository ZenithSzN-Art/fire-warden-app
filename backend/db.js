const sql = require("mssql");
require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: true, // Required for Azure SQL
        trustServerCertificate: false, // Azure SQL uses valid certificates
        enableArithAbort: true
    },
    connectionTimeout: 30000, // 30 seconds (from your connection string)
    requestTimeout: 30000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

console.log("🔍 Attempting to connect to Azure SQL Database...");
console.log("📡 Server:", process.env.DB_SERVER);
console.log("🗄️  Database:", process.env.DB_NAME);
console.log("👤 User:", process.env.DB_USER);

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("✅ Connected to Azure SQL Database successfully!");
        return pool;
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
        return null;
    });

module.exports = {
    sql,
    poolPromise,
};