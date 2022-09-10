import express from 'express';
import path from 'path';
import * as game from './game.js';

const app = express();

const clientPath = path.join(path.resolve(), '/client');
app.use(express.static(clientPath));


/**
 * Creates a new game status object and responds with a sanitized copy of it.
 * @param req - the request object
 * @param res - response object, contains the sanitized status object (without `word` property)
 */
function createGame(req, res) {
  const status = game.createGame();
  res.json(status);
}

/**
 * Given a game's id, if the game exists and its `onGoing` is `true`, 
 * it checks a letter passed in as a reqiest parameter.
 * If the guess was correct, it is added to the game's `hits`, otherwise to `misses`.
 * If the user has guessed the word or has no lives left, then we end the game.
 * The sanitized status is sent to the client as a response (or the full status on gameover).
 * @param req - request object containing the letter and the game's id
 * @param res - response that contains the status object
 */
function guessLetter(req, res) {
  res.json(game.guessLetter(req.params.id, req.params.letter));
}

/**
 * Given a game's id, if the game exits and is won, returns its score, otherwise an error.
 * @param req - request object containing the game's id
 * @param res - response that contains the score
 */
function calculateScore(req, res) {
  const id = req.params.id;
  const score = game.calculateScore(id);

  res.json({ score });
}

app.post('/games/', createGame);
app.post('/games/:id/:letter', guessLetter);
app.get('/games/:id/score', calculateScore);

app.listen(8080);

console.log('Server is running on port 8080. \
View it by visiting the following link in the browser: ');
console.log('http://localhost:8080/');
