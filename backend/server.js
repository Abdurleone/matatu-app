require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const matatuRoutes = require('./routes/matatuRoutes');
const tripHistoryRoutes = require('./routes/tripHistoryRoutes');
const userRoutes = require('./routes/userRoutes'); // Import the user routes for authentication

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection - Connect based on environment
const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/matatus', matatuRoutes);
app.use('/api/trip-history', tripHistoryRoutes);
app.use('/api/users', userRoutes);

// Server Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

module.exports = app;