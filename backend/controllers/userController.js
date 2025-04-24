const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register one or more users
const registerUser = async (req, res) => {
  try {
    const users = Array.isArray(req.body) ? req.body : [req.body];
    const createdUsers = [];
    const skippedUsers = [];

    for (const userData of users) {
      const { username, email, password, role, membershipNo } = userData;

      // Validate required fields based on role
      if (role === 'passenger' && (!username || !email)) {
        skippedUsers.push({ reason: 'Missing username/email for passenger', data: userData });
        continue;
      }
      if ((role === 'driver' || role === 'conductor') && !membershipNo) {
        skippedUsers.push({ reason: 'Missing membership number for driver/conductor', data: userData });
        continue;
      }

      // Check if a user already exists
      const existingUser = await User.findOne({
        $or: [
          email ? { email } : null,
          membershipNo ? { membershipNo } : null
        ].filter(Boolean),
      });

      if (existingUser) {
        skippedUsers.push({ reason: 'User already exists', data: userData });
        continue;
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        membershipNo,
      });

      await newUser.save();

      createdUsers.push({
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        membershipNo: newUser.membershipNo,
      });
    }

    res.status(201).json({
      message: `${createdUsers.length} user(s) registered successfully.`,
      createdUsers,
      skippedUsers,
    });

  } catch (error) {
    console.error("Registration error:", error);
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

    if (user.isAccountLocked && user.isAccountLocked()) {
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

// Password reset
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
  loginUser,
  resetPassword,
};