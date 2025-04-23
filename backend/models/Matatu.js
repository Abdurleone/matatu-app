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
    seatsAvailable: {
      type: Number,
      default: 33,
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
    isActive: {
      type: Boolean,
      default: true,
    },
  });
  
  // Route for booking a seat
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