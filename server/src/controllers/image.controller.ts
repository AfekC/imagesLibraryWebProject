import { Response } from "express"
import Request from '../interfaces/request'
import Image from '../models/image.model';
import { writeFile, deleteFile } from '../helpers';

export const getAllData = async (req: Request, res: Response) => {
  const data = await Image.find().select('name creator size');
  res.json(data);
};

export const getImage = async (req: Request, res: Response) => {
  const image = await Image.findById(req.params.id);
  res.download(image.imageRef, image.name, (err) => {
    if(err) console.error(err);
  });
};

export const deleteById = async (req: Request, res: Response) => {
  if (req.userId) {
    const imageId = req.params.id;
    const deletedImage = await Image.findOneAndDelete({ _id: imageId, creator: req.userId });
    deleteFile(deletedImage.imageRef);
    if (!deletedImage) {
      res.status(400);
      return res.json({ error: 'User dosnt have image with this Id' });
    }
    return res.json({ message: 'Image deleted successfully'});
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};

export const getImageComments = async (req: Request, res: Response) => {
  const { comments } = await Image.findById(req.params.id);
  if (comments) {
    return res.json({ comments });
  } else {
    res.status(400);
    res.json({ error: 'Image not found' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  if (req.userId) {
    const {comments} = await Image.findById(req.params.id).select('comments');

    if (comments) {
      comments.push({ text: req.body.text, userId: req.userId });
      await Image.findByIdAndUpdate(req.params.id, { comments });
      return res.json({ message: 'Comment added' });
    } else {
      res.status(400);
      res.json({ error: 'Image not found' });
    }
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};

export const addImage = async (req: Request, res: Response) => {
  if (req.userId) {
    const { name, file } = req.body;
    const path = writeFile(file, name, process.env.baseLibraryPath);
    return res.json((await new Image({ name, creator: req.userId, comments: [], imageRef: path }).save()));
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  if (req.userId) {
    const { name, file } = req.body;
    const { imageRef } = await Image.findById(req.params.id);
    deleteFile(imageRef);
    const path = writeFile(file, name, process.env.baseLibraryPath);
    const image = await Image.findByIdAndUpdate(req.params.id, { name, size: file.size, imageRef: path});
    if (image.creator.toString() !== req.userId) {
      res.status(401);
    }
    if (!image) {
      return res.status(400).json({ error: 'image not found' });
    } else {
      return res.json(image);
    }
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};
