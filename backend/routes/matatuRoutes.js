const express = require('express');
const Matatu = require('../models/Matatu');
const router = express.Router();

// Create Matatu
router.post('/', async (req, res) => {
  try {
    const newMatatu = await Matatu.create(req.body);
    res.status(201).json(newMatatu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Matatus
router.get('/', async (req, res) => {
  try {
    const matatus = await Matatu.find();
    res.json(matatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Matatu
router.get('/:id', async (req, res) => {
  try {
    const matatu = await Matatu.findById(req.params.id);
    if (!matatu) return res.status(404).json({ error: 'Matatu not found' });
    res.json(matatu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Matatu
router.put('/:id', async (req, res) => {
  try {
    const updated = await Matatu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Matatu
router.delete('/:id', async (req, res) => {
  try {
    await Matatu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Matatu deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;