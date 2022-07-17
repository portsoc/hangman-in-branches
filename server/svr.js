// To find out how to install express in your project: https://www.npmjs.com/package/express
// More about serving static files with express: https://expressjs.com/en/starter/static-files.html
import express from 'express';

const app = express();
// 'client' is the folder that contains the index.html and other static files
app.use(express.static('client'));

// 8080 is the default port for a server
app.listen(8080);
