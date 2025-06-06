const locationModel = require('../models/locationModel');

// Middleware to validate location input
const validateLocation = (req, res, next) => {
  const { location } = req.body;
  
  if (!location) {
    return res.status(400).json({ message: 'Location is required' });
  }
  
  if (!locationModel.isValidLocation(location)) {
    return res.status(400).json({ 
      message: 'Invalid location. Please select from the list of university buildings.' 
    });
  }
  
  next();
};

module.exports = { validateLocation };