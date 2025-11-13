const express = require('express');
// We need to merge params to access :deckId from the parent router
const router = express.Router({ mergeParams: true }); 
const {
    getCardsInDeck,
    addCardToDeck,
    updateCard,
    deleteCard
} = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');

// The parent router will be /api/v1/decks/:deckId/cards

// @route   GET /api/v1/decks/:deckId/cards
// @desc    Get all cards in a specific deck
// @access  Private
router.get('/', protect, getCardsInDeck);

// @route   POST /api/v1/decks/:deckId/cards
// @desc    Add a new card to a deck
// @access  Private
router.post('/', protect, addCardToDeck);

// These routes need to be separate because they operate on a specific card ID
const cardRouter = express.Router();

// @route   PUT /api/v1/cards/:id
// @desc    Update a card
// @access  Private
cardRouter.put('/:id', protect, updateCard);

// @route   DELETE /api/v1/cards/:id
// @desc    Delete a card
// @access  Private
cardRouter.delete('/:id', protect, deleteCard);

// We export both routers. The main one for deck-specific card actions,
// and the second one for card-specific actions.
module.exports = { deckCardRouter: router, cardRouter: cardRouter };