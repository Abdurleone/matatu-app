const express = require('express');
const router = express.Router();
const Conductor = require('../models/Conductor');

// Create Conductor
router.post('/', async (req, res) => {
  try {
    const newConductor = await Conductor.create(req.body);
    res.status(201).json(newConductor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Conductors
router.get('/', async (req, res) => {
  try {
    const conductors = await Conductor.find();
    res.json(conductors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Conductor by Membership
router.get('/:membershipNo', async (req, res) => {
  try {
    const conductor = await Conductor.findOne({ membershipNo: req.params.membershipNo });
    if (!conductor) return res.status(404).json({ error: 'Conductor not found' });
    res.json(conductor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Conductor
router.put('/:id', async (req, res) => {
  try {
    const updatedConductor = await Conductor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedConductor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Conductor
router.delete('/:id', async (req, res) => {
  try {
    await Conductor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Conductor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
  