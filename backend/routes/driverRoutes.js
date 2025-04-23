const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController.js');

router.post('/', driverController.createDriver);
router.get('/', driverController.getDrivers);
router.get('/membership/:membershipNo', driverController.getDriverByMembership);

module.exports = router;
  