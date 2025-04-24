// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route for new users (driver, conductor, passenger)
router.post('/register', userController.registerUser);

// Login route for users (driver, conductor, passenger)
router.post('/login', userController.loginUser);

// Password reset route (for account recovery after locking)
router.post('/reset-password', userController.resetPassword);

module.exports = router;