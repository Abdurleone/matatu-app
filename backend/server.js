require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const matatuRoutes = require('./routes/matatuRoutes'); // ✅ New import

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/matatus', matatuRoutes); // ✅ New route

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));