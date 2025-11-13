const express = require('express');
const router = express.Router();
const {
    getDecks,
    getPublicDecks,
    getMyDecks,
    getDeckById,
    createDeck,
    updateDeck,
    deleteDeck
} = require('../controllers/deckController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/v1/decks
// @desc    Get all decks (public and user's own)
// @access  Private
router.get('/', protect, getDecks);

// @route   GET /api/v1/decks/public
// @desc    Get public decks
// @access  Public
router.get('/public', getPublicDecks);

// @route   GET /api/v1/decks/my
// @desc    Get user's own decks
// @access  Private
router.get('/my', protect, getMyDecks);

// @route   GET /api/v1/decks/:id
// @desc    Get a single deck by ID
// @access  Public (if deck is public) or Private (if deck is private)
router.get('/:id', getDeckById);

// @route   POST /api/v1/decks
// @desc    Create a new deck
// @access  Private
router.post('/', protect, createDeck);

// @route   PUT /api/v1/decks/:id
// @desc    Update a deck
// @access  Private
router.put('/:id', protect, updateDeck);

// @route   DELETE /api/v1/decks/:id
// @desc    Delete a deck
// @access  Private
router.delete('/:id', protect, deleteDeck);

module.exports = router;