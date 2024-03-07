import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToken:
 *       type: object
 *       required:
 *         - userId
 *         - token
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the token
 *         token:
 *           type: string
 *           description: The token string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the token was created
 */

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 100 * 86400 // 100 days
  }
});

export default mongoose.model('UserToken', userTokenSchema);
