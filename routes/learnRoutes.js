const express = require('express');
const router = express.Router();
const { 
    startLearnSession,
    submitLearnSession,
    getLearnProgress
} = require('../controllers/learnController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/v1/learn/start
// @desc    Start a new learning or quiz session
// @access  Private
router.post('/start', protect, startLearnSession);

// @route   POST /api/v1/learn/submit
// @desc    Submit the results of a learning session
// @access  Private
router.post('/submit', protect, submitLearnSession);

// @route   GET /api/v1/learn/progress/:deckId
// @desc    Get learning progress for a specific deck
// @access  Private
router.get('/progress/:deckId', protect, getLearnProgress);

module.exports = router;