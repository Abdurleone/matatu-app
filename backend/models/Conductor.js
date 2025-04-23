const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema({
  membershipNo: {
    type: String,
    required: true,
    unique: true,
    match: /^C\d+$/, // Must start with 'C' followed by numbers
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Conductor', conductorSchema);
