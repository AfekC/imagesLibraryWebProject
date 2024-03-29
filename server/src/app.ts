import swagger from './swagger';
import { authMiddleware } from './auth';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import imageRoutes from './routes/image.route';
import mongoose from "mongoose";
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
dotenv.config();

export default () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once('open', () => console.log('Connected To DataBase'));
    db.on('error', (err) => console.error(err));

    mongoose.connect(process.env.DATABASE_URL).then(() => {
      const app = express();

      app.use(express.static('public'));
      app.use(cookieParser());
      app.use(cors());
      app.use(bodyParser.json());
      app.use(authMiddleware);;
      app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
      app.use(fileUpload());
      // Server main routes
      app.use('/user', userRoutes);
      app.use('/image', imageRoutes);

      swagger.initSwagger(app);
      resolve(app);
    }).catch((err) => console.error(err));
  });
  return promise;
}