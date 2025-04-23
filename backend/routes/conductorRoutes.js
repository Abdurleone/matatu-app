const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductorController.js');

router.post('/', conductorController.createConductor);
router.get('/', conductorController.getConductors);
router.get('/membership/:membershipNo', conductorController.getConductorByMembership);

module.exports = router;
  