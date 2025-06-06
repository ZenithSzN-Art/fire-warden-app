const locationModel = require('../models/locationModel');

class LocationController {
  // Get all locations
  getAllLocations(req, res) {
    try {
      const locations = locationModel.getAllLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LocationController();