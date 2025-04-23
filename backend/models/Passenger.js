const passengerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    matatu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matatu',
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Passenger', passengerSchema);
    