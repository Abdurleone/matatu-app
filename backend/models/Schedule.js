const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  matatuId: { type: mongoose.Schema.Types.ObjectId, required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  days: [String],
  departureTime: String,
  arrivalTime: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
