const mongoose = require('mongoose');

const matatuSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conductor',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Matatu', matatuSchema);