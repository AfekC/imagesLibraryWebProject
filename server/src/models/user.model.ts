import mongoose from "mongoose";
import User from '../interfaces/user'

const UserSchema =  new mongoose.Schema<User>({
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
  
export default mongoose.model<User>('User', UserSchema);