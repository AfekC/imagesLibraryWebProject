/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../models/user.model";
import UserToken from "../models/userToken.model";
import IUser from '../interfaces/user'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Response } from "express";
import Request from "../interfaces/request"
import { generateToken, verifyRefreshToken } from '../auth';
import { writeFile, deleteFile } from '../helpers';
import fs from 'fs';
import GoogleUserData from "../interfaces/googleUser";


const returnInvalidCredentials = (res) => {
    res.status(401);
    return res.json({ error: 'Invalid username or password' });
}

const addUser = async (user: IUser) : Promise<IUser> => {
  const { firstname, lastname, username, image, password } = user;
  const promise = new Promise<IUser>((resolve) => {
    bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async function (err, hash) {
          const user = await new User({ firstname, lastname, username, image, password: hash }).save();
          resolve(user);
      });
  });
  return promise;
}

const getUserImageAsBase64 = (path: string): string => {
  if (path) {
    if (!fs.existsSync(path)) {
      console.warn("path does not exists", path);
      return "";
    } 
    return "data:image/png;base64," + fs.readFileSync(path, "base64");
  }
  return "";
}

export const getUserByUserId = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id) as IUser;
    if (user && !!user.image) {
        user.image = getUserImageAsBase64(user.image);
    }
    res.json(user);
}

export const getUserById = async (id: string) : Promise<IUser>=> {
  const user = await User.findById(id) as IUser;
  if (user && !!user.image) {
      user.image = getUserImageAsBase64(user.image);
  }
  return user;
}

export const getUserByUsername = async (username: string): Promise<IUser> => {
  return User.findOne({ username });
}

export const getUserByUsernameTo = async (username: string): Promise<IUser> => {
    const user: IUser = await getUserByUsername(username);
    delete user.password;
    user.image = getUserImageAsBase64(user.image);
    return user;
}

export const getUserByToken = async (req: Request, res: Response) => {
  if (req.userId) {
      const user = await getUserById(req.userId);
      return res.json(user)
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  verifyRefreshToken(req.cookies['refreshToken'])
        .then(({ tokenDetails }) => {
            const payload = { userId: tokenDetails.userId };
            const accessToken = jwt.sign(
                payload,
                process.env.SESSION_SECRET,
                { expiresIn: "14m" }
            );
            res.status(200).cookie('accessToken', accessToken, { expires: new Date(Date.now() + 3600000) }).json({
                error: false,
                message: "Access token created successfully",
            });
        })
        .catch((err) => {
          res.status(400).json(err)}
        );
};

export const logout = async (req: Request, res: Response) =>{
  await UserToken.deleteOne({ token: req.cookies['refreshToken'] });
  res
  .clearCookie('accessToken')
  .clearCookie('refreshToken')
  .json({ error: false, message: "Logged Out Sucessfully" });
};

export const login = async (req: Request, res: Response)  => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (user && !!user.image) {
      user.image = getUserImageAsBase64(user.image);
  }
  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const { accessToken, refreshToken } = await generateToken(user);
        return res
        .cookie('accessToken', accessToken, { expires: new Date(Date.now() + 3600000) })
        .cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + 3600000 * 24 * 100) })
        .json(user);
      } else {
          return returnInvalidCredentials(res);
      }
  });
}

export const loginUsingGoogle = async (req: Request, res: Response) => {
    const googleUserData = req.body as GoogleUserData;
    let user = await User.findOne({firstname: googleUserData.given_name, lastname: googleUserData.family_name}) as unknown as IUser;
    if (!user) {
        user = {
            firstname: googleUserData.given_name,
            lastname: googleUserData.family_name,
            username: googleUserData.given_name + " " + googleUserData.family_name,
            password: googleUserData.given_name,
        } as IUser;
        user = await addUser(user);
        console.log(user);
    }
    const { accessToken, refreshToken } = await generateToken(user);
    return res
        .cookie('accessToken', accessToken, { expires: new Date(Date.now() + 3600000) })
        .cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + 3600000 * 24 * 100)})
        .json(user);
}

export const signin = async (req: Request, res: Response) => {
  const user = await addUser(req.body);

  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  const { accessToken, refreshToken } = await generateToken(user);
  return res
    .cookie('accessToken', accessToken, { expires: new Date(Date.now() + 3600000) })
    .cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + 3600000 * 24 * 100)})
    .json({ user });
}

export const updatePassword = async (newPassword: string, userToken: string) => {
  if (userToken) {
      try {
          bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS), async (err, hash) => {
              await User.findOneAndUpdate({ '_id': userToken }, { password: hash });
          });
      } catch (e) {
          console.error(e)
      }
  } else {
      console.error({ error: 'User not authenticated' });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (req.userId) {
      try {
        const updatedUser = req.body.user as IUser;
        const user = await getUserById(req.userId);

        await User.findOneAndUpdate({ '_id': user._id }, 
        { 
          firstname: req.body.user.firstname || user.firstname,
          lastname: req.body.user.lastname || user.lastname,
          username: req.body.user.username || user.username,
        });
        if (updatedUser.password) {
            await updatePassword(updatedUser.password, req.userId)
        }
        return res.json({ message: 'saved successfuly' });      
      } catch (e) {
          res.status(400);
          console.log(e)
          return res.json({ error: 'General Error' });
      }
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}

export const updateImage = async (req: Request, res: Response) => {
  if (req.userId) {
      try {
        const user = await User.findById(req.userId) as IUser;
        if (user && user.image) {
            deleteFile(user.image);
        }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
        const file = req.files?.file as Express.Multer.File;
        const fileBuffer: Buffer = file.data as Buffer;
        const path = writeFile(fileBuffer, req.userId.toString(), process.env.baseProfilePath);
        await User.findOneAndUpdate({ '_id': req.userId }, { image: path });
        return res.json({ image: getUserImageAsBase64(path) });
      } catch (e) {
          res.status(400);
          console.log(e);
          return res.json({ error: 'General Error' });
      }
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}