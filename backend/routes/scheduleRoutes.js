const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { matatuId } = req.query;
  const schedules = await Schedule.find(matatuId ? { matatuId } : {}).populate('routeId');
  res.json(schedules);
});

module.exports = router;
