import express from 'express';

const app = express();
app.use(express.static('client'));

app.listen(8080);

console.log('Server is running on port 8080. View it by visiting the following link in the browser:');
console.log('http://localhost:8080/');
