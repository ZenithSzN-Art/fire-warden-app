require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

// Import routes
const wardenRoutes = require('./routes/wardenRoutes');
const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-production-frontend.azurewebsites.net'
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Validate required environment variables
const requiredEnvVars = ['DB_SERVER', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wardens', wardenRoutes);
app.use('/api/locations', locationRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Fire Warden API is running');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server after ensuring database connection
const PORT = process.env.PORT || 5001;

poolPromise
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database. Server not started.', err);
    process.exit(1);
  });