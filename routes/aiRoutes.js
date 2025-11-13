const express = require('express');
const { getAiSuggestion, generateDeckWithAi } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/ai/suggestion:
 *   post:
 *     summary: Get a personalized AI learning roadmap
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - level
 *               - goal
 *               - timePerDay
 *             properties:
 *               level:
 *                 type: string
 *                 enum: [A1, A2, B1, B2, C1, C2]
 *               goal:
 *                 type: string
 *               timePerDay:
 *                 type: integer
 *                 description: Minutes per day
 *     responses:
 *       200:
 *         description: AI learning roadmap generated
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to generate AI suggestion
 */
router.post('/suggestion', protect, getAiSuggestion);

/**
 * @swagger
 * /api/v1/ai/generate-deck:
 *   post:
 *     summary: Generate a new deck of flashcards using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Prompt for AI to generate deck
 *               level:
 *                 type: string
 *                 enum: [A1, A2, B1, B2, C1, C2]
 *               topic:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: Generated deck and text
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Failed to generate AI deck
 */
router.post('/generate-deck', protect, generateDeckWithAi);

module.exports = router;
