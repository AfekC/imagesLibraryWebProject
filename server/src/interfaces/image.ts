import IUser from "./user";

export default interface IImage {
  _id: string,
  name: string,
  size: number,
  creator: IUser,
  comments: [
    {
      text: string,
      userId: string,
    }
  ],
  imageRef: string
  createdAt: Date,
}

