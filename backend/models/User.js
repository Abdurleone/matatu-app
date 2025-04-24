// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () { return this.role === 'passenger'; },
    unique: function () { return this.role === 'passenger'; }, // Only passengers have a username
  },
  email: {
    type: String,
    required: function () { return this.role === 'passenger'; },
    unique: function () { return this.role === 'passenger'; }, // Only passengers have an email
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['driver', 'conductor', 'passenger'],
    required: true,
  },
  membershipNo: {
    type: String,
    required: function () { return this.role === 'driver' || this.role === 'conductor'; },
    unique: function () { return this.role === 'driver' || this.role === 'conductor'; }, // Only drivers and conductors have a membership number
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  accountLocked: {
    type: Boolean,
    default: false,
  },
  lockUntil: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check if the account is locked (e.g., after 4 failed login attempts)
userSchema.methods.isAccountLocked = function () {
  return this.accountLocked && this.lockUntil > Date.now();
};

// Update login attempts (increment after failed login)
userSchema.methods.incrementLoginAttempts = async function () {
  if (this.failedLoginAttempts + 1 >= 4) {
    this.accountLocked = true;
    this.lockUntil = Date.now() + 60 * 60 * 1000; // Lock for 1 hour
  } else {
    this.failedLoginAttempts += 1;
  }
  await this.save();
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function () {
  this.failedLoginAttempts = 0;
  this.accountLocked = false;
  this.lockUntil = null;
  await this.save();
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;