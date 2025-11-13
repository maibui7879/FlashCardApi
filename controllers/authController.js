const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Login as a guest
// @route   POST /api/v1/auth/guest
// @access  Public
const loginAsGuest = asyncHandler(async (req, res) => {
    // Implementation for guest login
    res.status(501).json({ message: 'Not implemented' });
});

// @desc    Convert a guest account to a full user account
// @route   POST /api/v1/auth/convert-guest
// @access  Private (Guest)
const convertGuestToUser = asyncHandler(async (req, res) => {
    // Implementation for converting guest to user
    res.status(501).json({ message: 'Not implemented' });
});


module.exports = { registerUser, loginUser, loginAsGuest, convertGuestToUser };
