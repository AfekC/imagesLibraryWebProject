import { getAllData, getImage, deleteImages, getImageComments, addComment, addImage, updateImage } from '../controllers/image.controller';
import * as express from 'express';

const router = express.Router()

router.get('/', getAllData);
router.get('/:id', getImage);
router.post('/remove/byIds', deleteImages);
router.get('/:id/comments', getImageComments);
router.post('/comments', addComment);
router.post('/:id/update', updateImage);
router.post('/upload', addImage);

export default router