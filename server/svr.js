import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import path from 'path';

/**
 * Stores the status objects of the game in play. Each object has the following properties:
 * `id` - the id of the game
 * `word` - the word to be guessed,
 * `hits` - an array of the letters that have been guessed correctly,
 * `misses` - an array of the letters that have been guessed incorrectly,
 * `onGoing` - a boolean that indicates if the game is still in progress,
 * `userWord` - an array of letters that has been guessed so far ('_' for unguessed letters),
 * `last` - a boolean that is true if the last guess was a hit,
 * `won` - a boolean that is true if the user has guessed the word.
 */
const gamesInPlay = [];

const app = express();

const clientPath = path.join(path.resolve(), '/client');
app.use(express.static(clientPath));

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

/**
 * Takes the size of an array and returns a random index between 0 and size.
 * The number itself is not included in the range.
 * @param size - The size of the array.
 * @returns A random index from the array.
 */
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}

/**
 * Return a random element from the given array.
 * @param array - The array to choose a random element from.
 * @returns A random element from the array.
 */
function randomElement(array) {
  const size = array.length;
  const index = randomIndex(size);
  const element = array[index];
  return element;
}

/**
 * It takes a game id and returns a copy of the game's status, but with the word property removed
 * @param id - The unique identifier for the game.
 * @returns The sanitized status object.
 */
function sanitizedStatus(id) {
  const result = { ...gamesInPlay[id] };
  delete result.word;
  return result;
}

/**
 * Creates a new game status object and adds it to the `gamesInPlay` array.
 * It also responds with the sanitized status object.
 * @param req - the request object
 * @param res - response object, contains the sanitized status object (without `word` property)
 */
function createGame(req, res) {
  const id = uuidv4();
  const word = randomElement(words);

  gamesInPlay[id] = {
    id,
    word,
    onGoing: true,
    hits: [],
    misses: [],
    userWord: word.replace(/[a-z]/ig, '_').split(''),
    last: false,
    won: false,
  };

  res.json(sanitizedStatus(id));
}

/**
 * Given a game's id, check if a given letter is in the game's word.
 * It also updates the `userWord` of the game.
 * @param letter - the letter that the user guessed
 * @param id - the unique identifier for the game
 * @returns `true` if the letter is in the word, `false` otherwise
 */
function checkLetter(letter, id) {
  if (!gamesInPlay[id]) {
    return false;
  }

  let found = false;
  const lowerCaseWord = gamesInPlay[id].word.toLowerCase();

  for (let i = 0; i < gamesInPlay[id].word.length; i++) {
    if (lowerCaseWord[i] === letter.toLowerCase()) {
      gamesInPlay[id].userWord[i] = gamesInPlay[id].word[i];
      found = true;
    }
  }

  return found;
}

/**
 * Given a game's id, checks whether the user has guessed the word.
 * @param id - the unique identifier for the game
 * @returns `true` if the user has guessed the word, `false` otherwise
 */
function checkWon(id) {
  if (!gamesInPlay[id]) {
    return false;
  }

  return gamesInPlay[id].userWord.join('') === gamesInPlay[id].word;
}

/**
 * Given a game's id, if the game is ongoing, it checks if a given letter is in the word.
 * If this was the case, we add it to hits array, otherwise we add it to the misses array.
 * If the user has guessed the word or has no lives left, then we end the game.
 * The sanitized status is sent to the client as a response (or the full status on gameover).
 * @param req - request object containing the letter and the game's id
 * @param res - response that contains the status object
 */
function guessLetter(req, res) {
  const letter = req.params.letter.toLowerCase();
  const id = req.params.id;

  if (gamesInPlay[id].onGoing) {
    gamesInPlay[id].last = checkLetter(letter, id);

    if (gamesInPlay[id].last) {
      gamesInPlay[id].hits.push(letter);
    } else {
      gamesInPlay[id].misses.push(letter);
    }

    gamesInPlay[id].won = checkWon(id);
    if (gamesInPlay[id].won || gamesInPlay[id].misses.length > 9) {
      gamesInPlay[id].onGoing = false;
    }
  }

  const response = gamesInPlay[id].onGoing ? sanitizedStatus(id) : gamesInPlay[id];
  res.json(response);
}

/**
 * Game is won and over, respond with a score based on the number of misses, otherwise `0`.
 * @param req - request object containing the game's id
 * @param res - response that contains the score
 */
function calculateScore(req, res) {
  const id = req.params.id;
  console.log(gamesInPlay[id]);

  let score = 0;
  if (gamesInPlay[id].won && !gamesInPlay[id].onGoing) {
    score = 1 / (1 + gamesInPlay[id].misses.length) * 1000;
    // let's round the score to the nearest integer
    score = Math.round(score);
  }

  res.json({ score });
}

app.post('/games/', createGame);
app.post('/games/:id/:letter', guessLetter);
app.get('/games/:id/score', calculateScore);

app.listen(8080);

console.log('Server is running on port 8080. \
View it by visiting the following link in the browser: ');
console.log('http://localhost:8080/');
