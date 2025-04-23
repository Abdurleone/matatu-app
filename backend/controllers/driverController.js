const Driver = require('../models/Driver');

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a driver by membershipNo
exports.getDriverByMembership = async (req, res) => {
  try {
    const driver = await Driver.findOne({ membershipNo: req.params.membershipNo });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};