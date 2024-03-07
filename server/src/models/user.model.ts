import mongoose from "mongoose";
import IUser from '../interfaces/user';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - username
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 *         lastname:
 *           type: string
 *           description: The lastname of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         image:
 *           type: string
 *           description: The path to the user's profile image
 */

const UserSchema =  new mongoose.Schema<IUser>({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  }
});

export default mongoose.model<IUser>('User', UserSchema);
