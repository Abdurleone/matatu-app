const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

router.post('/', async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const routes = await Route.find();
  res.json(routes);
});

module.exports = router;