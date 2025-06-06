const { poolPromise, sql } = require('../db');

class WardenModel {
  // Get all wardens
  async getAllWardens() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM FireWardens ORDER BY entryDateTime DESC');
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  // Get warden by staff number
  async getWardenByStaffNumber(staffNumber) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('staffNumber', sql.VarChar, staffNumber)
        .query('SELECT * FROM FireWardens WHERE staffNumber = @staffNumber');
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  // Add a new warden
  async addWarden(wardenData) {
    try {
      const { staffNumber, firstName, lastName, location } = wardenData;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('staffNumber', sql.VarChar, staffNumber)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('location', sql.VarChar, location || 'Not Specified')
        .query(`
          INSERT INTO FireWardens (staffNumber, firstName, lastName, location, entryDateTime)
          VALUES (@staffNumber, @firstName, @lastName, @location, GETDATE());
          SELECT SCOPE_IDENTITY() AS id;
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  // Update warden
  async updateWarden(staffNumber, wardenData) {
    try {
      const { firstName, lastName, location } = wardenData;
      const pool = await poolPromise;
      await pool.request()
        .input('staffNumber', sql.VarChar, staffNumber)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('location', sql.VarChar, location || 'Not Specified')
        .query(`
          UPDATE FireWardens 
          SET firstName = @firstName, 
              lastName = @lastName, 
              location = @location, 
              entryDateTime = GETDATE()
          WHERE staffNumber = @staffNumber
        `);
      return this.getWardenByStaffNumber(staffNumber);
    } catch (error) {
      throw error;
    }
  }

  // Delete warden
  async deleteWarden(staffNumber) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('staffNumber', sql.VarChar, staffNumber)
        .query('DELETE FROM FireWardens WHERE staffNumber = @staffNumber');
      return { message: 'Warden deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new WardenModel();