const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// @route  GET /api/profile
// @desc   Get current user's profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  // req.user added by protect middleware
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @route  PUT /api/profile
// @desc   Update current user's profile (name, email, password optional)
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { name, email, password } = req.body;
  if (name) user.name = name;
  if (email) user.email = email.toLowerCase();

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email
  });
});

module.exports = { getProfile, updateProfile };
