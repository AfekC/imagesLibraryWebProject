import conf from './conf/conf.json'
import swagger from './swagger.js';
import { authMiddleware } from './auth';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import itemRoutes from './routes/item.route';


const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);
app.use(cookieParser());
app.use(session({ secret: process.env.APP_SECRET, resave: true, saveUninitialized: true }));

//server main routs
app.use('/user', userRoutes);
app.use('/item', itemRoutes);

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
// Setting up port with express js
app.listen(conf.APP_PORT, () => {
  console.log('port: ' + conf.APP_PORT);
})

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });

swagger.initSwagger(app);

