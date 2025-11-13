const express = require('express');
// We need to merge params to access :id from the deck router
const router = express.Router({ mergeParams: true });
const {
    rateDeck,
    getDeckRatings,
    updateRating,
    deleteRating
} = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

// The parent router will be /api/v1/decks/:id/rate or /api/v1/decks/:id/ratings

// @route   POST /api/v1/decks/:id/rate
// @desc    Rate a deck
// @access  Private
router.post('/rate', protect, rateDeck);

// @route   GET /api/v1/decks/:id/ratings
// @desc    Get all ratings for a deck
// @access  Public
router.get('/ratings', getDeckRatings);

// These routes need to be separate because they operate on a specific rating ID
const ratingRouter = express.Router();

// @route   PUT /api/v1/ratings/:id
// @desc    Update a rating
// @access  Private
ratingRouter.put('/:id', protect, updateRating);

// @route   DELETE /api/v1/ratings/:id
// @desc    Delete a rating
// @access  Private
ratingRouter.delete('/:id', protect, deleteRating);

module.exports = { deckRatingRouter: router, ratingRouter: ratingRouter };