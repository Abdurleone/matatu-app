require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const matatuRoutes = require('./routes/matatuRoutes');
const driverRoutes = require('./routes/driverRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Register routes
app.use('/api/matatus', matatuRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/conductors', conductorRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));