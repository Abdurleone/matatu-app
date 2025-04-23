const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  membershipNo: {
    type: String,
    required: true,
    unique: true,
    match: /^D\d+$/, // Must start with 'D' followed by numbers
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  licenseNo: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);