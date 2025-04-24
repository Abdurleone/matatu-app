const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Secret
const JWT_SECRET = 'your-jwt-secret-key';

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or Email already in use' });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err });
  }
});

// Login for user (driver, conductor, or passenger)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.accountLocked) {
      return res.status(403).json({ error: 'Account locked. Please reset your password.' });
    }

    // Check password match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Increment failed login attempts
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 4) {
        // Lock the account if too many failed attempts
        user.accountLocked = true;
        user.lockUntil = Date.now() + 3600000; // Lock for 1 hour
      }

      await user.save();
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', details: err });
  }
});

// Force password reset (after account is locked)
router.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Reset lock status and failed attempts
    user.accountLocked = false;
    user.failedLoginAttempts = 0;
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error resetting password', details: err });
  }
});

module.exports = router;