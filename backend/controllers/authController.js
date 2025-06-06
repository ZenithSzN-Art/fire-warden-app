const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, staffNumber, password } = req.body;
      
      const pool = await poolPromise;
      
      // Check if user exists
      const userCheck = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Users WHERE username = @email');
        
      if (userCheck.recordset.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert new user
      await pool.request()
        .input('username', sql.VarChar, email)
        .input('password', sql.VarChar, hashedPassword)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('staffNumber', sql.VarChar, staffNumber)
        .query(`
          INSERT INTO Users (username, password, firstName, lastName, staffNumber)
          VALUES (@username, @password, @firstName, @lastName, @staffNumber);
        `);
        
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const pool = await poolPromise;
      
      // Find user
      const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Users WHERE username = @email');
      
      const user = result.recordset[0];
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.username,
          staffNumber: user.staffNumber,
          isAdmin: user.isAdmin
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Send response without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        token,
        user: userWithoutPassword,
        message: 'Logged in successfully'
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }
};

module.exports = authController; 