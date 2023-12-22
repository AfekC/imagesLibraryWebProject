/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../models/user.model";
import UserToken from "../models/userToken.model";
import UserInterface from '../interfaces/user'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Response } from "express";
import Request from "../interfaces/request"
import { generateToken, verifyRefreshToken } from '../auth';


const returnInvalidCredentials = (res) => {
    res.status(401);
    return res.json({ error: 'Invalid username or password' });
}

const addUser = async (user: UserInterface) : Promise<UserInterface> => {
  const { firstname, lastname, username, image, password } = user;
  const promise = new Promise<UserInterface>((resolve) => {
    bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async function (err, hash) {
          const user = await new User({ firstname, lastname, username, image, password: hash }).save();
          resolve(user);
      });
  });
  return promise;
}

export const getUserById = async (id: string) : Promise<UserInterface>=> {
  return await User.findById(id);
}

const getUserByUsername = async (username: string): Promise<UserInterface> => {
  return User.findOne({ username });
}

export const getUserByToken = async (req: Request, res: Response) => {
  if (req.userId) {
      const user = await getUserById(req.userId);
      return res.json({ user })
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  verifyRefreshToken(req.header('refreshToken'))
        .then(({ tokenDetails }) => {
            const payload = { userId: tokenDetails.userId };
            const accessToken = jwt.sign(
                payload,
                process.env.SESSION_SECRET,
                { expiresIn: "14m" }
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => {
          res.status(400).json(err)}
        );
};

export const logout = async (req: Request, res: Response) =>{
  await UserToken.deleteOne({ token: req.header('refreshToken') });
  res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username)
  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const { accessToken, refreshToken } = await generateToken(user);
        return res.json({ accessToken, refreshToken, user });
      } else {
          return returnInvalidCredentials(res);
      }
  });
}

export const signin = async (req: Request, res: Response) => {
  const user = await addUser(req.body);

  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  const { accessToken, refreshToken } = await generateToken(user);
  return res.json({ accessToken, refreshToken, user });
}

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (req.userId) {
      try {
          const user = await getUserById(req.userId);
          bcrypt.compare(oldPassword, user.password, async (err, result) => {
              if (result) {
                  await new Promise((resolve, reject) => {
                    bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS), function (err, hash) {
                      User.findOneAndUpdate({ '_id': req.userId }, { password: hash }).then(resolve).catch(reject);
                    });
                  });
                  return res.json({ message: "changed successfuly" });
              } else {
                  return returnInvalidCredentials(res);
              }
          });
      } catch (e) {
          res.status(400);
          console.log(e)
          return res.json({ error: 'General Error' });
      }
  } else {
      res.status(400);
      return res.json({ error: 'User not authenticated' });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  if (req.userId) {
      try {
        const user = await getUserById(req.userId);
        await User.findOneAndUpdate({ '_id': user._id }, 
        { 
          firstname: req.body.user.firstname || user.firstname as any, 
          lastname: req.body.user.lastname || user.lastname as any,
          username: req.body.user.username || user.username as any,
        });
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
        await User.findOneAndUpdate({ '_id': req.userId }, { image: req.body.file });
        return res.json({ message: 'saved successfuly' });      
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