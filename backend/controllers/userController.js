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
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Password is required and should be a valid string' });
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
    const saltRounds = 10;
    newUser.password = await bcrypt.hash(password, saltRounds);

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

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      await user.incrementLoginAttempts();
      return res.status(400).json({ message: 'Invalid password' });
    }

    await user.resetLoginAttempts();

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

    user.accountLocked = false;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users with optional filters, pagination, sorting
const getAllUsers = async (req, res) => {
  try {
    const { role, membershipNo, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (membershipNo) filter.membershipNo = membershipNo;
    filter.isActive = { $ne: false }; // Optional soft delete filter

    const sortOrder = order === 'asc' ? 1 : -1;

    const users = await User.find(filter)
      .select('-password')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(filter);

    res.status(200).json({
      users,
      total: totalUsers,
      page: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  getAllUsers,
};