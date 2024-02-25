import { refreshToken, logout, login, signin, getUserByToken, updateUser, updateImage, getUserByUsernameTo, getUserByUserId, loginUsingGoogle } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserByToken);
router.get('/id/:id', getUserByUserId);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logout);
router.post('/login', login);
router.post('/auth/google', loginUsingGoogle);
router.post('/signin', signin);
router.post('/update', updateUser);
router.post('/byUsername', getUserByUsernameTo);
router.post('/update/image', updateImage);

export default router;