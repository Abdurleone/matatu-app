const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: String,
  timeFromStart: Number,
});

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [stopSchema],
});

module.exports = mongoose.model('Route', routeSchema);
