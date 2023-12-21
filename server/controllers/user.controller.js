const { User } = require("../models");
const bcrypt = require('bcrypt');
const conf = require("../conf/conf.json");
import { asyncForEach } from "../helpers";
import njwt from 'njwt';

// create jwt token
const encodeToken = (tokenData) => {
    return njwt.create(tokenData, process.env.SESSION_SECRET).compact();
}

const returnInvalidCredentials = (res) => {
    res.status(401);
    return res.json({ error: 'Invalid username or password' });

}

const addUser = async (user) => {
  const { firstname, lastname, username, image, password } = user;

  const promise = new Promise((resolve, reject) => {
      bcrypt.hash(password, conf.saltRounds, async function (err, hash) {
          const user = await new User({ firstname, lastname, username, image, password: hash }).save();
          resolve(user);
      });
  });
  return promise;
}

export const getUserById = async (id) => {
  return (await User.findById(id))._doc;
}

const getUserByUsername = async (username) => {
  return User.findOne({ username });
}

export const getUserByToken = async (req, res) => {
  if (!!req.userId) {
      const user = await getUserById(req.userId);
      return res.json({ user })
  } else {
      res.status(401);
      return res.json({ error: 'User not authenticated' });
  }
}

export const login = async (req, res) => {
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

export const signin = async (req, res) => {
  const user = await addUser(req.body);

  if (!user) {
      returnInvalidCredentials(res)
      return;
  }

  const accessToken = encodeToken({ userId: user.id });
  return res.json({ accessToken, user });
}

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!!req.userId) {
      try {
          const user = await getUserById(req.userId);
          bcrypt.compare(oldPassword, user.password, async (err, result) => {
              if (result) {
                  const r = await new Promise((resolve, reject) => {
                    bcrypt.hash(newPassword, conf.saltRounds, function (err, hash) {
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

export const updateUser = async (req, res) => {
  if (!!req.userId) {
      try {
        const user = await getUserById(req.userId);
        await asyncForEach(Object.keys(user), (key) => {
            if (req.body.user[key]) {
                user[key] = req.body.user[key];
            }
        })
        const { _id, firstname, lastname, username } = user;
        const a = await User.findOneAndUpdate({ '_id': _id }, { firstname, lastname, username });
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

export const updateImage = async (req, res) => {
  if (!!req.userId) {
      try {
        await User.findOneAndUpdate({ '_id': req.userId }, { image: req.file });
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