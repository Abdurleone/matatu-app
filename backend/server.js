require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const matatuRoutes = require('./routes/matatuRoutes');
const driverRoutes = require('./routes/driverRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const tripHistoryRoutes = require('./routes/tripHistoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// API Routes
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/matatus', matatuRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/conductors', conductorRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/trip-history', tripHistoryRoutes);

// Server Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));