const tripHistorySchema = new mongoose.Schema({
    matatu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matatu',
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    conductor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conductor',
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    tripDate: {
      type: Date,
      required: true,
    },
  });
  
  module.exports = mongoose.model('TripHistory', tripHistorySchema);
  