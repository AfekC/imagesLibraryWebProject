/**
 * @swagger
 * tags:
 *   name: users
 *   description: The Authentication API
 */

import { refreshToken, logout, login, signin, getUserByToken, updateUser, getUserByUserId, loginUsingGoogle, updateImage } from '../controllers/user.controller';
import * as express from 'express';

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details by token
 *     description: Retrieve user details based on the provided access token.
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
router.get('/', getUserByToken);

/**
 * @swagger
 * /user/id/{id}:
 *   get:
 *     summary: Get user details by user ID
 *     description: Retrieve user details based on the provided user ID.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
router.get('/id/:id', getUserByUserId);

/**
 * @swagger
 * /user/refreshtoken:
 *   post:
 *     summary: Refresh user token
 *     description: Refresh the user's access token.
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: Token refreshed successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/refreshtoken', refreshToken);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     description: Invalidate the user's access token and log the user out.
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/logout', logout);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user using JWT.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User authentication successful
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token"
 *               refreshToken: "your_refresh_token"
 *       '401':
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid username or password"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/login', login);

/**
 * @swagger
 * /user/auth/google:
 *   post:
 *     summary: Handle Google authentication
 *     description: Authenticate a user using Google credentials or create a new account if the user does not exist.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               accessToken:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               imgSrc:
 *                 type: string
 *             required:
 *               - googleId
 *               - accessToken
 *               - firstName
 *               - lastName
 *     responses:
 *       '200':
 *         description: Google authentication successful
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token"
 *               refreshToken: "your_refresh_token"
 *               _id: "user_id"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/auth/google', loginUsingGoogle);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up user
 *     description: Create a new user account.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/signup', signin);

/**
 * @swagger
 * /user/update:
 *   post:
 *     summary: Update user details
 *     description: Update user details like firstname, lastname, or username.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User details updated successfully"
 *       '401':
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: "User not authenticated"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/update', updateUser);

/**
 * @swagger
 * /user/update/image:
 *   post:
 *     summary: Update user image
 *     description: Update user profile image.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: User image updated successfully
 *         content:
 *           application/json:
 *             example:
 *               image: "base64_encoded_image"
 *       '401':
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: "User not authenticated"
 *       '500':
 *         description: Internal Server Error
 */
router.post('/update/image', updateImage);
export default router;