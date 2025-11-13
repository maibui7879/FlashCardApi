const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    loginAsGuest,
    convertGuestToUser
} = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201: {
 *         description: User created successfully
 *       }
 *       400: {
 *         description: Bad request
 *       }
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user & get token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200: {
 *         description: Successful login
 *       }
 *       401: {
 *         description: Unauthorized
 *       }
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/v1/auth/guest:
 *   post:
 *     summary: Login as a guest
 *     tags: [Authentication]
 *     responses:
 *       200: {
 *         description: Successful guest login
 *       }
 * */
router.post('/guest', loginAsGuest);

/**
 * @swagger
 * /api/v1/auth/convert-guest:
 *   post:
 *     summary: Convert a guest account to a full user account
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200: {
 *         description: Account converted successfully
 *       }
 *       401: {
 *         description: Unauthorized
 *       }
 */
router.post('/convert-guest', convertGuestToUser);

module.exports = router;