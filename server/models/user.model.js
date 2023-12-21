import mongoose from "mongoose";

const UserSchema =  new mongoose.Schema({
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
  
module.exports = mongoose.model('User', UserSchema);