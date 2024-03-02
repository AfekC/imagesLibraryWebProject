import https from 'https';
import fs from 'fs';
import path from 'path';
import initApp from './app';

const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.cert'))
};

initApp().then((app) => {
      // Error handler
      app.use((req, res, next, err) => {
        console.error(err); // Log error message in our server's console
        if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
        res.status(err.statusCode).send(err); // All HTTP requests must have a response, so let's send back an error with its status code and message
      });
      // Setting up port with express js

     https.createServer(httpsOptions, app).listen(process.env.APP_PORT, () => {
         console.log('port: ' + process.env.APP_PORT);
     });
});