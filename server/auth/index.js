import njwt from 'njwt';
import { getUserById } from '../controllers/user.controller.js';



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
      const decoded = decodeToken(token);
      const { userId } = decoded;
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