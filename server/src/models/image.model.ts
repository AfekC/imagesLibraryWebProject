import mongoose from "mongoose";
import IImage from '../interfaces/image';

const imageSchema =  new mongoose.Schema<IImage>({
    name: {
      type: String
    },
    size: {
      type: Number
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
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
          default: new Date(),
        }
      }
    ],
    imageRef: String
});

export default mongoose.model<IImage>('Image', imageSchema);
