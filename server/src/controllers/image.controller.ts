import { Response } from "express"
import Request from '../interfaces/request'
import Image from '../models/image.model';
import User from '../models/user.model';
import { writeFile, deleteFile, writeFileByPath } from '../helpers';
import IImage from "../interfaces/image";
import { v4 as generateUUid } from "uuid";
import fs from "fs";

const getImageAsBase64 = (path: string): string => {
  if (path) {
    if (!fs.existsSync(path)) {
      console.warn("path does not exists");
      return "";
    }
    return "data:image/png;base64," + fs.readFileSync(path, "base64");
  }
  return "";
}

export const getAllData = async (req: Request, res: Response) => {
  const images = await Image.find() as IImage[];
  images.forEach((image) => {
    image.imageRef = getImageAsBase64(image.imageRef);
  })
  res.json(images);
};

export const getImage = async (req: Request, res: Response) => {
  const { id: imageId } = req.params;
  const image = await Image.findById(imageId) as IImage;
  if (image && image.imageRef) {
    image.imageRef = getImageAsBase64(image.imageRef);
  }
  res.json(image);
};

const deleteById = async (postId: number) => {
    const deletedImage = await Image.findOneAndDelete({ _id: postId }) as IImage;
    deleteFile(deletedImage.imageRef);
};

export const deleteImages = async (req: Request, res: Response) => {
  const postsIds: number[] = req.body;
  await Promise.all(postsIds.map((postsId) => deleteById(postsId)));
  return res.json({ message: "delete posts" });
}

export const getImageComments = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { comments } = await Image.findById(_id);
  if (comments) {
    return res.json({ comments });
  } else {
    res.status(400);
    res.json({ error: 'Image not found' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  if (req.userId) {
    const { imageId, text } = req.body;
    const image = await Image.findById(imageId) as IImage;
    if (image && image.comments) {
      image.comments.push({ text, userId: req.userId });
      await Image.findByIdAndUpdate(imageId, { comments: image.comments });
      return res.json(image.comments);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = req.files?.file as Express.Multer.File;
    const caption = req.body.caption;
    const fileBuffer: Buffer = file.data as Buffer;
    const fileName = generateUUid() + req.userId;
    const path = writeFile(fileBuffer, fileName, process.env.baseLibraryPath);
    const user = User.findById(req.userId);
    const image = (await new Image({ name: caption, creator: req.userId, comments: [], imageRef: path, user }).save()) as IImage;
    image.imageRef = getImageAsBase64(image.imageRef);
    return res.json(image);
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  if (req.userId) {
    const { _id, caption } = req.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = req.files?.file as Express.Multer.File;
    let image = await Image.findById(_id) as IImage;
    if (image.creator._id !== req.userId) {
      res.status(401);
    }
    deleteFile(image.imageRef);
    const fileBuffer: Buffer = file.data as Buffer;
    const path = writeFileByPath(fileBuffer, image.imageRef);
    image = await Image.findByIdAndUpdate(_id, { size: file.size, imageRef: path, name: caption }) as IImage;
    image.imageRef = getImageAsBase64(image.imageRef);
    image.name = caption;
    if (!image) {
      return res.status(400).json({ error: 'image not found' });
    } else {
      res.status(200);
      return res.json(image);
    }
  } else {
    res.status(401);
    return res.json({ error: 'User not authenticated' });
  }
};
