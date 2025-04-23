// GET all conductors
router.get('/', async (req, res) => {
    try {
      const conductors = await Conductor.find();
      res.json(conductors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // GET conductor by membership number
  router.get('/membership/:membershipNo', async (req, res) => {
    try {
      const conductor = await Conductor.findOne({ membershipNo: req.params.membershipNo });
      if (!conductor) return res.status(404).json({ error: 'Conductor not found' });
      res.json(conductor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  