// To find out how to install express in your project visit: 
// https://www.npmjs.com/package/express
import express from 'express';

const app = express();
app.use(express.static('client'));

app.listen(8080);
