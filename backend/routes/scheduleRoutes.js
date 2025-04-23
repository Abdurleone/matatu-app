const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// Create Schedule
router.post('/', async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('matatu');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('matatu');
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Schedule by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSchedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Schedule by ID
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
