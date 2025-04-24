const mongoose = require('mongoose');

// Check if the model is already compiled
const Matatu = mongoose.models.Matatu || mongoose.model('Matatu', new mongoose.Schema({
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
  }
}, {
  timestamps: true
}));

module.exports = Matatu;

router.put('/book-seat/:id', async (req, res) => {
  try {
    const matatu = await Matatu.findById(req.params.id);
    if (!matatu) return res.status(404).json({ error: 'Matatu not found' });

    if (matatu.seatsAvailable > 0) {
      matatu.seatsAvailable -= 1;
      await matatu.save();
      res.json({ message: 'Seat booked successfully', matatu });
    } else {
      res.status(400).json({ error: 'No seats available' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});