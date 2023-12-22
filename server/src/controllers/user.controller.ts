/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../models/user.model";
import UserInterface from '../interfaces/user'
import bcrypt from 'bcrypt';
import { asyncForEach } from "../helpers";
import njwt from 'njwt';
import { Response, Request } from "express";

// create jwt token
const encodeToken = (tokenData) => {
    return njwt.create(tokenData, process.env.SESSION_SECRET).compact();
}

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
  if (req.body.userId) {
      const user = await getUserById(req.body.userId);
      return res.json({ user })
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username)
  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
          const accessToken = encodeToken({ userId: user.id });
          return res.json({ accessToken, user });
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

  const accessToken = encodeToken({ userId: user.id });
  return res.json({ accessToken, user });
}

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (req.body.userId) {
      try {
          const user = await getUserById(req.body.userId);
          bcrypt.compare(oldPassword, user.password, async (err, result) => {
              if (result) {
                  await new Promise((resolve, reject) => {
                    bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS), function (err, hash) {
                      User.findOneAndUpdate({ '_id': req.body.userId }, { password: hash }).then(resolve).catch(reject);
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
  if (req.body.userId) {
      try {
        const user = await getUserById(req.body.userId);
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
  if (req.body.userId) {
      try {
        await User.findOneAndUpdate({ '_id': req.body.userId }, { image: req.body.file });
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