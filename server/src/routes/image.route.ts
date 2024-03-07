import { getAllData, getImage, deleteImages, getImageComments, addComment, addImage, updateImage } from '../controllers/image.controller';
import * as express from 'express';

const router = express.Router()

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 *     description: Retrieve all images
 *     tags:
 *       - images
 *     responses:
 *       '200':
 *         description: A list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 */
router.get('/', getAllData);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get an image by ID
 *     description: Retrieve an image by its ID
 *     tags:
 *       - images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the image to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested image
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 */
router.get('/:id', getImage);

/**
 * @swagger
 * /images/remove/byIds:
 *   post:
 *     summary: Delete multiple images by IDs
 *     description: Delete multiple images by providing their IDs
 *     tags:
 *       - images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *     responses:
 *       '200':
 *         description: Images deleted successfully
 *       '400':
 *         description: Bad request
 */
router.post('/remove/byIds', deleteImages);

/**
 * @swagger
 * /images/{id}/comments:
 *   get:
 *     summary: Get comments of an image
 *     description: Retrieve comments associated with an image by its ID
 *     tags:
 *       - images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the image
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comments of the image
 */
router.get('/:id/comments', getImageComments);

/**
 * @swagger
 * /images/comments:
 *   post:
 *     summary: Add a comment to an image
 *     description: Add a comment to an image by providing image ID and text
 *     tags:
 *       - images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *       '400':
 *         description: Bad request
 */
router.post('/comments', addComment);

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload an image
 *     description: Upload an image with a caption
 *     tags:
 *       - images
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
 *               caption:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 *       '400':
 *         description: Bad request
 */
router.post('/upload', addImage);

/**
 * @swagger
 * /images/{id}/update:
 *   post:
 *     summary: Update an image
 *     description: Update an image by its ID
 *     tags:
 *       - images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the image to update
 *         schema:
 *           type: string
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
 *               caption:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Image updated successfully
 *       '400':
 *         description: Bad request
 */
router.post('/:id/update', updateImage);

export default router;
