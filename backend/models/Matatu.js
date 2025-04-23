const mongoose = require('mongoose');

const matatuSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    default: 33,
  },
  driverMembershipNo: {
    type: String,
    required: true,
    match: /^D/,
  },
  conductorMembershipNo: {
    type: String,
    required: true,
    match: /^C/,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Matatu', matatuSchema);