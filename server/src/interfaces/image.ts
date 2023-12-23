import mongoose from "mongoose"

export default interface IImage {
  name: string,
  size: number,
  creator: mongoose.Schema.Types.ObjectId,
  comments: [
    {
      text: string,
      userId: string,
    }
  ],
  imageRef: string
  createdAt: Date,
}

