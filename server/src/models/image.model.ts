import mongoose from "mongoose";
import IImage from '../interfaces/image';

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       required:
 *         - name
 *         - size
 *         - creator
 *         - createdAt
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the image
 *         size:
 *           type: number
 *           description: The size of the image in bytes
 *         creator:
 *           type: string
 *           description: The ID of the user who created the image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the image was created
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text of the comment
 *               userId:
 *                 type: string
 *                 description: The ID of the user who made the comment
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the comment was made
 *           description: The comments associated with the image
 *         imageRef:
 *           type: string
 *           description: The reference to the image file
 */

const imageSchema =  new mongoose.Schema<IImage>({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: [
        {
            text: {
                type: String
            },
            userId: {
                type: String,
            },
            createdAt: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ],
    imageRef: String
});
export default mongoose.model<IImage>('Image', imageSchema);
