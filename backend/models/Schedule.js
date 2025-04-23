const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  matatu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matatu',
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
