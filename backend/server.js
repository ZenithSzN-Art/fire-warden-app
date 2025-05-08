require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { poolPromise, sql } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// API: Get all wardens
app.get('/api/wardens', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM FireWardens');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Add a new warden
app.post('/api/wardens', async (req, res) => {
  try {
    const { staffNumber, firstName, lastName, location } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('staffNumber', sql.VarChar, staffNumber)
      .input('firstName', sql.VarChar, firstName)
      .input('lastName', sql.VarChar, lastName)
      .input('location', sql.VarChar, location)
      .query(`
        INSERT INTO FireWardens (staffNumber, firstName, lastName, location, entryDateTime)
        VALUES (@staffNumber, @firstName, @lastName, @location, GETDATE())
      `);
    res.status(201).json({ message: 'Warden added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));