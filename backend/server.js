require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get token from header

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user; // Store user data in the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// API Routes
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/matatus', matatuRoutes);
app.use('/api/trip-history', tripHistoryRoutes);

// Protect user routes with authentication middleware (if needed)
app.use('/api/users', userRoutes); // You may want to add the authenticateJWT middleware to protect sensitive routes.

app.use('/api/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'You have access to this route because you are authenticated.' });
});

// Server Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

module.exports = app;