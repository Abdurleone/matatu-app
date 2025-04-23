const Passenger = require('../models/Passenger');

// Create Passenger
exports.createPassenger = async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    await newPassenger.save();
    res.status(201).json(newPassenger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Passengers
exports.getPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Passenger by ID
exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Passenger by ID
exports.deletePassengerById = async (req, res) => {
  try {
    const passenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!passenger) return res.status(404).json({ error: 'Passenger not found' });
    res.json({ message: 'Passenger deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};