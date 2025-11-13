const express = require('express');
const router = express.Router();
const { 
    startLearnSession,
    submitLearnSession,
    getLearnProgress
} = require('../controllers/learnController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Learning
 *   description: Learning and quiz session management
 */

/**
 * @swagger
 * /api/v1/learn/start:
 *   post:
 *     summary: Start a new learning or quiz session
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deckId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [learn, quiz]
 *     responses:
 *       200:
 *         description: Session started successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/start', protect, startLearnSession);

/**
 * @swagger
 * /api/v1/learn/submit:
 *   post:
 *     summary: Submit the results of a learning session
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               results:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cardId:
 *                       type: string
 *                     isCorrect:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: Session results submitted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/submit', protect, submitLearnSession);

/**
 * @swagger
 * /api/v1/learn/progress/{deckId}:
 *   get:
 *     summary: Get learning progress for a specific deck
 *     tags: [Learning]
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
 *         description: Learning progress for the deck.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Deck not found
 */
router.get('/progress/:deckId', protect, getLearnProgress);

module.exports = router;
