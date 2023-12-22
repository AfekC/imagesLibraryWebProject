import { login, signin, getUserByToken, updatePassword, updateUser, updateImage } from '../controllers/user.controller.js';
import * as express from 'express';
import multer from "multer";
const router = express.Router();

// initialize a multer object for uploading user profile image
const upload = multer({
    fileFilter: (req, file, cb) => {
        console.log(file)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.get('/', getUserByToken);
router.post('/login', login);
router.post('/signin', signin);
router.post('/update', updateUser);
router.post('/update/password', updatePassword);
router.post('/update/image', upload.single("image"), updateImage);

module.exports = router;