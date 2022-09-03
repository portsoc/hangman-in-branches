import express from 'express';
import path from 'path';
import * as game from './game.js';

const app = express();

const clientPath = path.join(path.resolve(), '/client');
app.use(express.static(clientPath));


/**
 * Creates a new game status object and returns the sanitized copu of it.
 * @param req - the request object
 * @param res - response object, contains the sanitized status object (without `word` property)
 */
async function createGame(req, res) {
  const status = await game.createGame();
  res.json(status);
}

/**
 * Given a game's id, if the game exists and is ongoing, it checks if a given letter is in the word.
 * If this was the case, we add it to hits array, otherwise we add it to the misses array.
 * If the user has guessed the word or has no lives left, then we end the game.
 * The sanitized status is sent to the client as a response (or the full status on gameover).
 * @param req - request object containing the letter and the game's id
 * @param res - response that contains the status object
 */
async function guessLetter(req, res) {
  const status = await game.guessLetter(req.params.id, req.params.letter);
  res.json(status);
}

/**
 * Game is won, respond with a score based on the number of misses, otherwise and error message.
 * @param req - request object containing the game's id
 * @param res - response that contains the score
 */
async function calculateScore(req, res) {
  const id = req.params.id;
  const score = await game.calculateScore(id);

  res.json({ score });
}

/**
 * It takes an asynchronous function, and returns a function with additional error handling.
 * @param f - The function to wrap.
 * @returns The function that returns a promise that calls the original function on resolve
 * and next if it throws an error
 */
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.post('/games/', asyncWrap(createGame));
app.post('/games/:id/:letter', asyncWrap(guessLetter));
app.get('/games/:id/score', asyncWrap(calculateScore));

app.listen(8080);
console.log('Server is now running on port 8080');
