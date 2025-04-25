const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Reset password route
router.post('/reset-password', userController.resetPassword);

// Get users (with optional filters)
router.get('/', userController.getAllUsers);

module.exports = router;