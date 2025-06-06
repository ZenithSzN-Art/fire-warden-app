const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/wardenController');
const { validateLocation } = require('../middlewares/validateLocationMiddleware');

// GET all wardens
router.get('/', wardenController.getAllWardens);

// GET warden by staff number
router.get('/:staffNumber', wardenController.getWardenByStaffNumber);

// POST new warden
router.post('/', validateLocation, wardenController.addWarden);

// PUT update warden
router.put('/:staffNumber', validateLocation, wardenController.updateWarden);

// DELETE warden
router.delete('/:staffNumber', wardenController.deleteWarden);

module.exports = router;