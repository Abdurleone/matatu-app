// GET all drivers
router.get('/', async (req, res) => {
    try {
      const drivers = await Driver.find();
      res.json(drivers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // GET driver by membership number
  router.get('/membership/:membershipNo', async (req, res) => {
    try {
      const driver = await Driver.findOne({ membershipNo: req.params.membershipNo });
      if (!driver) return res.status(404).json({ error: 'Driver not found' });
      res.json(driver);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  