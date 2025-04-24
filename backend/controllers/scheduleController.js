const Schedule = require('../models/Schedule');

// Helper: Check for conflicting schedule
const hasConflict = async (matatuId, departureTime, scheduleId = null) => {
  const existing = await Schedule.findOne({
    matatuId,
    departureTime,
    _id: { $ne: scheduleId }, // exclude current schedule for updates
    deleted: false
  });
  return !!existing;
};

// Create Schedule
exports.createSchedule = async (req, res) => {
  try {
    const { matatuId, departureTime } = req.body;

    if (await hasConflict(matatuId, departureTime)) {
      return res.status(409).json({ error: 'Conflicting schedule for this matatu at the same time' });
    }

    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Schedules with search + auto-deactivation
exports.getSchedules = async (req, res) => {
  const { matatuId, routeId, destination, isActive, startDate, endDate } = req.query;

  try {
    const filter = { deleted: false };

    if (matatuId) filter.matatuId = matatuId;
    if (routeId) filter.routeId = routeId;
    if (destination) filter.destination = { $regex: destination, $options: 'i' };
    if (typeof isActive !== 'undefined') filter.isActive = isActive === 'true';

    if (startDate || endDate) {
      filter.departureTime = {};
      if (startDate) filter.departureTime.$gte = new Date(startDate);
      if (endDate) filter.departureTime.$lte = new Date(endDate);
    }

    // Auto-deactivate past schedules
    await Schedule.updateMany(
      { departureTime: { $lt: new Date() }, isActive: true, deleted: false },
      { $set: { isActive: false } }
    );

    const schedules = await Schedule.find(filter)
      .populate('matatuId')
      .populate('routeId');

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      deleted: false
    }).populate('matatuId').populate('routeId');

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Schedule
exports.updateScheduleById = async (req, res) => {
  try {
    const { matatuId, departureTime } = req.body;

    if (await hasConflict(matatuId, departureTime, req.params.id)) {
      return res.status(409).json({ error: 'Conflicting schedule for this matatu at the same time' });
    }

    const updated = await Schedule.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Schedule not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft Delete Schedule
exports.deleteScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
    res.json({ message: 'Schedule soft deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};