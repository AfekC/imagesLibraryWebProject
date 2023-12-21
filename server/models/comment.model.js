import mongoose from "mongoose";

const CommentSchema =  new mongoose.Schema({
  text: {
    type: String
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});
  
module.exports = mongoose.model('Comment', CommentSchema);