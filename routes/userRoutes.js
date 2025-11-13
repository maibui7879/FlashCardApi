const express = require('express');
const router = express.Router();
const { 
    getUserProfile,
    updateUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/v1/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, getUserProfile);

// @route   PUT /api/v1/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', protect, updateUserProfile);

module.exports = router;