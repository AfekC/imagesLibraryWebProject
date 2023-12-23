import mongoose from "mongoose";
import IUser from '../interfaces/user'

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