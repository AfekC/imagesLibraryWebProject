import mongoose from "mongoose";

const userToken =  new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 100 * 86400 }, // 100 days
});

export default mongoose.model('UserToken', userToken);
