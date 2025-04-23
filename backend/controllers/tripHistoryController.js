const TripHistory = require('../models/tripHistory');

// Create Trip History
exports.createTripHistory = async (req, res) => {
  try {
    const newTripHistory = new TripHistory(req.body);
    await newTripHistory.save();
    res.status(201).json(newTripHistory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Trip Histories
exports.getTripHistories = async (req, res) => {
  try {
    const tripHistories = await TripHistory.find().populate('matatu driver conductor');
    res.json(tripHistories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Trip History by ID
exports.getTripHistoryById = async (req, res) => {
  try {
    const tripHistory = await TripHistory.findById(req.params.id).populate('matatu driver conductor');
    if (!tripHistory) return res.status(404).json({ error: 'Trip History not found' });
    res.json(tripHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Trip History by ID
exports.deleteTripHistoryById = async (req, res) => {
  try {
    const tripHistory = await TripHistory.findByIdAndDelete(req.params.id);
    if (!tripHistory) return res.status(404).json({ error: 'Trip History not found' });
    res.json({ message: 'Trip History deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};