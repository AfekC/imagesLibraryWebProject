import njwt from 'njwt';
import { getUserById } from '../controllers/user.controller';


// decode jwt token
const decodeToken = (token) => {
    return njwt.verify(token, process.env.SESSION_SECRET).setExpiration(-1).body;
}

export const authMiddleware = async (req, res, next) => {
  try {
      const token = req.header('accessToken');
      if (!token) {
          return next();
      }
      const userId = decodeToken(token).toJSON()['userId'].toString();
      const user = await getUserById(userId)
      if (user) {
          req.body.userId = userId;
      }
  } catch (e) {
      console.log(e);
      res.status(401);
      return res.json({ error: 'jwt error' });
  }
  next();
};