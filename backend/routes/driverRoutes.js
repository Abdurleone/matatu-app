const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// Create Driver
router.post('/', async (req, res) => {
  try {
    const newDriver = await Driver.create(req.body);
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Driver by Membership
router.get('/:membershipNo', async (req, res) => {
  try {
    const driver = await Driver.findOne({ membershipNo: req.params.membershipNo });
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Driver
router.put('/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDriver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Driver
router.delete('/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;