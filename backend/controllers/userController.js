const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Driver = require('../models/Driver');
const Conductor = require('../models/Conductor');

const registerUser = async (userData) => {
  const { membershipNumber, password, role } = userData;

  if (!membershipNumber || typeof membershipNumber !== 'string') {
    return {
      success: false,
      reason: 'Membership number is required and should be a valid string',
      data: userData
    };
  }

  if (!password || typeof password !== 'string') {
    return {
      success: false,
      reason: 'Password is required and should be a valid string',
      data: userData
    };
  }

  if (!role || !['driver', 'conductor', 'admin'].includes(role)) {
    return {
      success: false,
      reason: 'Role must be either driver, conductor, or admin',
      data: userData
    };
  }

  // Check for duplicates
  const existingUser = await User.findOne({ membershipNumber });
  if (existingUser) {
    return {
      success: false,
      reason: 'User with this membership number already exists',
      data: userData
    };
  }

  let refId;

  if (role === 'driver') {
    const driver = await Driver.findOne({ membershipNumber });
    if (!driver) {
      return {
        success: false,
        reason: 'Driver not found with given membership number',
        data: userData
      };
    }
    refId = driver._id;
  } else if (role === 'conductor') {
    const conductor = await Conductor.findOne({ membershipNumber });
    if (!conductor) {
      return {
        success: false,
        reason: 'Conductor not found with given membership number',
        data: userData
      };
    }
    refId = conductor._id;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    membershipNumber,
    password: hashedPassword,
    role,
    refId: refId || null
  });

  await newUser.save();

  return {
    success: true,
    user: {
      membershipNumber: newUser.membershipNumber,
      role: newUser.role
    }
  };
};

const registerMultipleUsers = async (req, res) => {
  const users = req.body;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'No user data provided' });
  }

  const createdUsers = [];
  const skippedUsers = [];

  for (const userData of users) {
    try {
      const result = await registerUser(userData);
      if (result.success) {
        createdUsers.push(result.user);
      } else {
        skippedUsers.push({
          reason: result.reason,
          data: result.data
        });
      }
    } catch (err) {
      skippedUsers.push({
        reason: 'Unexpected error',
        data: userData,
        error: err.message
      });
    }
  }

  res.status(201).json({
    message: `${createdUsers.length} user(s) registered successfully.`,
    createdUsers,
    skippedUsers
  });
};

module.exports = {
  registerMultipleUsers
};