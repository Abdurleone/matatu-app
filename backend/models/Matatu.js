const mongoose = require('mongoose');

// Check if the model is already compiled
const matatuSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conductor'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Check if the Matatu model is already compiled
const Matatu = mongoose.models.Matatu || mongoose.model('Matatu', matatuSchema);

module.exports = Matatu;
