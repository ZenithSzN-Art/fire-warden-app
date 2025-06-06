const wardenModel = require('../models/wardenModel');

class WardenController {
  // Get all wardens
  async getAllWardens(req, res) {
    try {
      const wardens = await wardenModel.getAllWardens();
      res.json(wardens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get warden by staff number
  async getWardenByStaffNumber(req, res) {
    try {
      const { staffNumber } = req.params;
      const warden = await wardenModel.getWardenByStaffNumber(staffNumber);
      
      if (!warden) {
        return res.status(404).json({ message: 'Warden not found' });
      }
      
      res.json(warden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add a new warden
  async addWarden(req, res) {
    try {
      const { staffNumber, firstName, lastName, location } = req.body;
      
      // Basic validation
      if (!staffNumber || !firstName || !lastName) {
        return res.status(400).json({ message: 'Staff number, first name, and last name are required' });
      }
      
      // Check if warden already exists
      const existingWarden = await wardenModel.getWardenByStaffNumber(staffNumber);
      if (existingWarden) {
        return res.status(409).json({ message: 'Warden with this staff number already exists' });
      }
      
      const result = await wardenModel.addWarden(req.body);
      res.status(201).json({ message: 'Warden added successfully', data: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update warden
  async updateWarden(req, res) {
    try {
      const { staffNumber } = req.params;
      const { firstName, lastName, location } = req.body;
      
      // Basic validation
      if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and last name are required' });
      }
      
      // Check if warden exists
      const existingWarden = await wardenModel.getWardenByStaffNumber(staffNumber);
      if (!existingWarden) {
        return res.status(404).json({ message: 'Warden not found' });
      }
      
      const updatedWarden = await wardenModel.updateWarden(staffNumber, req.body);
      res.json({ message: 'Warden updated successfully', data: updatedWarden });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete warden
  async deleteWarden(req, res) {
    try {
      const { staffNumber } = req.params;
      
      // Check if warden exists
      const existingWarden = await wardenModel.getWardenByStaffNumber(staffNumber);
      if (!existingWarden) {
        return res.status(404).json({ message: 'Warden not found' });
      }
      
      await wardenModel.deleteWarden(staffNumber);
      res.json({ message: 'Warden deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WardenController();