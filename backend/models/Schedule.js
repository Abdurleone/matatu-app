const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  matatuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu',
    required: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);