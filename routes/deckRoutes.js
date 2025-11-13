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

/**
 * @swagger
 * tags:
 *   name: Decks
 *   description: Deck management
 */

/**
 * @swagger
 * /api/v1/decks:
 *   get:
 *     summary: Get all decks (public and user's own)
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of decks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getDecks);

/**
 * @swagger
 * /api/v1/decks/public:
 *   get:
 *     summary: Get public decks
 *     tags: [Decks]
 *     responses:
 *       200:
 *         description: A list of public decks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 */
router.get('/public', getPublicDecks);

/**
 * @swagger
 * /api/v1/decks/my:
 *   get:
 *     summary: Get user's own decks
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's decks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deck'
 *       401:
 *         description: Unauthorized
 */
router.get('/my', protect, getMyDecks);

/**
 * @swagger
 * /api/v1/decks/{id}:
 *   get:
 *     summary: Get a single deck by ID
 *     tags: [Decks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck.
 *     responses:
 *       200:
 *         description: The requested deck.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deck'
 *       404:
 *         description: Deck not found
 *   put:
 *     summary: Update a deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deck'
 *     responses:
 *       200:
 *         description: Deck updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deck not found
 *   delete:
 *     summary: Delete a deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck to delete.
 *     responses:
 *       200:
 *         description: Deck deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deck not found
 */
router.route('/:id').get(getDeckById).put(protect, updateDeck).delete(protect, deleteDeck);

/**
 * @swagger
 * /api/v1/decks:
 *   post:
 *     summary: Create a new deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deck'
 *     responses:
 *       201:
 *         description: Deck created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, createDeck);

module.exports = router;
