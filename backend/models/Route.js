const mongoose = require('mongoose');

// Sub-schema for stops
const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  timeFromStart: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Main route schema
const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  stops: {
    type: [stopSchema],
    validate: [arrayLimit, 'A route must have at least two stops'],
  },
}, {
  timestamps: true
});

// Custom validator for stop length
function arrayLimit(val) {
  return val.length >= 2;
}

module.exports = mongoose.model('Route', routeSchema);