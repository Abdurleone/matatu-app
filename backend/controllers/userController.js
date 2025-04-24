const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a single user (driver, conductor, or passenger)
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, membershipNo } = req.body;

    if (role === 'passenger' && (!username || !email)) {
      return res.status(400).json({ message: 'Username and email are required for passengers' });
    }

    if ((role === 'driver' || role === 'conductor') && !membershipNo) {
      return res.status(400).json({ message: 'Membership number is required for drivers and conductors' });
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { membershipNo }
      ],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, password, role, membershipNo });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Register multiple users in bulk
const registerUsersBulk = async (req, res) => {
  try {
    const users = req.body;
    const createdUsers = [];
    const skippedUsers = [];

    for (const userData of users) {
      const { username, email, password, role } = userData;
      const membershipNo = userData.membershipNo || userData.membershipNumber;

      if (role === 'passenger' && (!username || !email)) {
        skippedUsers.push({ reason: 'Missing username or email for passenger', data: userData });
        continue;
      }

      if ((role === 'driver' || role === 'conductor') && !membershipNo) {
        skippedUsers.push({ reason: 'Missing membership number for driver/conductor', data: userData });
        continue;
      }

      const existingUser = await User.findOne({
        $or: [
          { email },
          { membershipNo }
        ]
      });

      if (existingUser) {
        skippedUsers.push({ reason: 'User already exists', data: userData });
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, role, membershipNo });
      await newUser.save();
      createdUsers.push({ username, email, role, membershipNo });
    }

    res.status(201).json({
      message: `${createdUsers.length} user(s) registered successfully.`,
      createdUsers,
      skippedUsers,
    });
  } catch (error) {
    console.error('Bulk registration error:', error);
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
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
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

module.exports = {
  registerUser,
  registerUsersBulk,
  loginUser,
  resetPassword,
};