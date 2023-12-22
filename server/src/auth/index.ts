/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserById } from '../controllers/user.controller';
import Request from "../interfaces/request"
import { Response, NextFunction } from "express";
import UserToken from "../models/userToken.model";
import UserInstance from "../interfaces/user";


// decode jwt token
const decodeToken = (token) => {
    return jwt.verify(token, process.env.SESSION_SECRET);
}

export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {
  try {
      const token = req.header('accessToken');
      if (!token) {
          return next();
      }
      const {userId} = (decodeToken(token) as JwtPayload);
      const user = await getUserById(userId)
      if (user) {
          req.userId = userId;
      }
  } catch (e) {
      console.log(e);
      res.status(401);
      return res.json({ error: 'jwt error' });
  }
  next();
};


// create jwt token
export const generateToken = async (user: UserInstance): Promise<any> => {
    const payload = { userId: user._id };
    const accessToken =jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '100d' });
    await UserToken.deleteOne({ userId: user._id });
  
    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  }

export const verifyRefreshToken = async (refreshToken): Promise<any> => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const doc = await UserToken.findOne({ token: refreshToken });
    if (!doc)
        throw { error: true, message: "Invalid refresh token" };

    return new Promise<any>((resolve, reject) => {
        jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
            if (err)
                reject ({ error: true, message: "Invalid refresh token" });
            resolve({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        });
    });
};