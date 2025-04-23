const Route = require('../models/Route');

// Create one or many routes
exports.createRoutes = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const createdRoutes = await Route.insertMany(data);
    res.status(201).json(createdRoutes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};