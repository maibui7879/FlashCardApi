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

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management
 */

/**
 * @swagger
 * /api/v1/decks/{deckId}/cards:
 *   get:
 *     summary: Get all cards in a specific deck
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck.
 *     responses:
 *       200:
 *         description: A list of cards in the deck.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deck not found
 *   post:
 *     summary: Add a new card to a deck
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/').get(protect, getCardsInDeck).post(protect, addCardToDeck);


// These routes need to be separate because they operate on a specific card ID
const cardRouter = express.Router();

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   put:
 *     summary: Update a card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Card not found
 *   delete:
 *     summary: Delete a card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to delete.
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Card not found
 */
cardRouter.route('/:id').put(protect, updateCard).delete(protect, deleteCard);


// We export both routers. The main one for deck-specific card actions,
// and the second one for card-specific actions.
module.exports = { deckCardRouter: router, cardRouter: cardRouter };
