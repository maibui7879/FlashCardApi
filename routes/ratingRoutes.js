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

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Deck rating management
 */

/**
 * @swagger
 * /api/v1/decks/{id}/rate:
 *   post:
 *     summary: Rate a deck
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck to rate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deck not found
 */
router.post('/rate', protect, rateDeck);

/**
 * @swagger
 * /api/v1/decks/{id}/ratings:
 *   get:
 *     summary: Get all ratings for a deck
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the deck.
 *     responses:
 *       200:
 *         description: A list of ratings for the deck.
 *       404:
 *         description: Deck not found
 */
router.get('/ratings', getDeckRatings);

// These routes need to be separate because they operate on a specific rating ID
const ratingRouter = express.Router();

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rating not found
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating to delete.
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rating not found
 */
ratingRouter.route('/:id').put(protect, updateRating).delete(protect, deleteRating);

module.exports = { deckRatingRouter: router, ratingRouter: ratingRouter };
