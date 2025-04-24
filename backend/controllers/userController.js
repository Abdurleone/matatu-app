// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (driver, conductor, or passenger)
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, membershipNo } = req.body;

    // Validate required fields based on role
    if (role === 'passenger' && (!username || !email)) {
      return res.status(400).json({ message: 'Username and email are required for passengers' });
    }
    if ((role === 'driver' || role === 'conductor') && !membershipNo) {
      return res.status(400).json({ message: 'Membership number is required for drivers and conductors' });
    }

    // Check if a user already exists with the same email (for passengers) or membershipNo (for driver/conductor)
    const existingUser = await User.findOne({
      $or: [
        { email },
        { membershipNo }
      ],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role,
      membershipNo,
    });

    // Hash the password
    newUser.password = await bcrypt.hash(password, 10);

    // Save user to the database
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { membershipNo, email, password } = req.body;

    // Check if account is locked due to too many failed login attempts
    const user = await User.findOne({
      $or: [
        { email },
        { membershipNo }
      ],
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isAccountLocked()) {
      return res.status(400).json({ message: 'Account locked due to multiple failed login attempts. Please reset your password.' });
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      // Increment failed login attempts
      await user.incrementLoginAttempts();
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Reset login attempts after successful login
    await user.resetLoginAttempts();

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Password reset (to be triggered when account is locked)
const resetPassword = async (req, res) => {
  try {
    const { email, membershipNo, newPassword } = req.body;

    const user = await User.findOne({
      $or: [
        { email },
        { membershipNo }
      ],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Reset account lock and failed attempts
    user.accountLocked = false;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    // Hash the new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  resetPassword,
};