import mongoose from "mongoose";

const itemSchema =  new mongoose.Schema({
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
    }
});

export default mongoose.model('Item', itemSchema);
