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
async function createGame(req, res) {
  const status = await game.createGame();
  res.json(status);
}

/**
 * Given a game's id, if the game exists and its `onGoing` is `true`,
 * it checks a letter passed in as a request parameter.
 * If the guess was correct, it is added to the game's `hits`, otherwise to `misses`.
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
 * Given a game's id, if the game exits and is won, responds with its score, otherwise an error.
 * @param req - request object containing the game's id
 * @param res - response that contains the score
 */
async function calculateScore(req, res) {
  const id = req.params.id;
  const score = await game.calculateScore(id);

  res.json({ score });
}

/**
 * Takes an asynchronous function `f`, and returns a function resolving to a call to `f` if everything goes well.
 * It calls `next` or creates a new error if something goes wrong.
 * @param f - The function to wrap.
 * @returns The wrapped function.
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
