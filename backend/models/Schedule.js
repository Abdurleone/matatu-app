const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  matatu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu', // Reference to Matatu model
    required: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route', // Reference to Route model
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