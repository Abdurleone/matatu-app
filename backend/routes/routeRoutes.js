const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// Create one or many routes
router.post('/', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const routes = await Route.insertMany(data);
    res.status(201).json(routes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;