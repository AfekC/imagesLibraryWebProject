import { refreshToken, logout, login, signin, getUserByToken, updatePassword, updateUser, updateImage, getUserByUsernameTo } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserByToken);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logout);
router.post('/login', login);
router.post('/signin', signin);
router.post('/update', updateUser);
router.post('/byUsername', getUserByUsernameTo);
router.post('/update/password', updatePassword);
router.post('/update/image', updateImage);

export default router;