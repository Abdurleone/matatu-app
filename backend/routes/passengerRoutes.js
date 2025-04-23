const express = require('express');
const router = express.Router();
const Passenger = require('../models/passenger');

// Create Passenger
router.post('/', async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    await newPassenger.save();
    res.status(201).json(newPassenger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Passengers
router.get('/', async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Passenger by ID
router.get('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Passenger by ID
router.delete('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.json({ message: 'Passenger deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;