import { refreshToken, logout, login, signin, getUserByToken, updateUser, updateImage, getUserByUserId, loginUsingGoogle } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserByToken);
router.get('/id/:id', getUserByUserId);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logout);
router.post('/login', login);
router.post('/auth/google', loginUsingGoogle);
router.post('/signup', signin);
router.post('/update', updateUser);
router.post('/update/image', updateImage);

export default router;