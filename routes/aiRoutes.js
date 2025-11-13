const express = require('express');
const router = express.Router();
const {
    getAiSuggestion,
    generateDeckWithAi
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/v1/ai/suggestion
// @desc    Get a personalized learning roadmap from AI
// @access  Private
router.post('/suggestion', protect, getAiSuggestion);

// @route   POST /api/v1/ai/generate-deck
// @desc    Generate a new deck of flashcards using AI
// @access  Private
router.post('/generate-deck', protect, generateDeckWithAi);

module.exports = router;