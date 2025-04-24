const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
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
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Passenger = mongoose.models.Passenger || mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;