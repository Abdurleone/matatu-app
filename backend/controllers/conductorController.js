const Conductor = require('../models/Conductor');

// Create a new conductor
exports.createConductor = async (req, res) => {
  try {
    const conductor = new Conductor(req.body);
    await conductor.save();
    res.status(201).json(conductor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all conductors
exports.getConductors = async (req, res) => {
  try {
    const conductors = await Conductor.find();
    res.json(conductors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a conductor by membershipNo
exports.getConductorByMembership = async (req, res) => {
  try {
    const conductor = await Conductor.findOne({ membershipNo: req.params.membershipNo });
    if (!conductor) return res.status(404).json({ message: 'Conductor not found' });
    res.json(conductor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};