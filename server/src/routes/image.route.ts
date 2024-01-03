import { getAllData, getImage, deleteById, getImageComments, addComment, addImage, updateImage } from '../controllers/image.controller';
import * as express from 'express';

const router = express.Router()

router.get('/', getAllData);
router.get('/:id', getImage);
router.delete('/:id', deleteById);
router.get('/:id/comments', getImageComments);
router.post('/:id/comments', addComment);
router.post('/:id/update', updateImage);
router.post('/upload', addImage);

export default router