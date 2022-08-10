import express from 'express';
import path from 'path';

const app = express();

// define the path to the client folder using "path.join" (works both on windows and unix systems)
const clientPath = path.join(path.resolve(), '/client');
app.use(express.static(clientPath));

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

/**
 * Stores the status of the game and has the following properties:
 * `word` - the word to be guessed,
 * `hits` - an array of the letters that have been guessed correctly,
 * `misses` - an array of the letters that have been guessed incorrectly,
 * `onGoing` - a boolean that indicates if the game is still in progress,
 * `userWord` - an array of letters that has been guessed so far ('_' for unguessed letters),
 * `last` - a boolean that is true if the last guess was a hit,
 * `won` - a boolean that is true if the user has guessed the word.
 */
const status = {};

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
 * It returns a copy of the status object, but without the word property
 * @returns the status object with the word property deleted
 */
function sanitizedStatus() {
  // use the spread operator to copy the object otherwise it will be a reference to the same object
  // for more info visit the following link:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const result = { ...status };
  delete result.word;
  return result;
}

/**
 * Creates a new game by resettting the properties of `status` variable.
 * @param req - the request object
 * @param res - response object, contains the sanitized `status` variable (without `word` property)
 */
function createGame(req, res) {
  status.word = randomElement(words);
  status.onGoing = true;
  status.hits = [];
  status.misses = [];
  status.userWord = status.word.replace(/[a-z]/ig, '_').split('');
  res.json(sanitizedStatus());
}

/**
 * Checks if a given letter is in the word, then updates `gameState.userWord`.
 * @param letter - the letter that the user guessed
 * @returns `true` if the letter is in the word, `false` otherwise
 */
function checkLetter(letter) {
  let found = false;
  const lowercaseWord = status.word.toLowerCase();

  for (let i = 0; i < status.word.length; i++) {
    if (lowercaseWord[i] === letter.toLowerCase()) {
      status.userWord[i] = status.word[i];
      found = true;
    }
  }

  return found;
}

/**
 * Checks whether the user has guessed the word.
 * @returns `true` if the user has guessed the word, `false` otherwise
 */
function checkWon() {
  return status.userWord.join('') === status.word;
}

/**
 * If the game is ongoing, then we check if the letter is in the word, and if it is,
 * we add it to hits array, otherwise we add it to the misses array.
 * If the user has guessed the word or has no lives left, then we end the game.
 * The sanitized status is sent to the client as a response (or the full status on gameover).
 * @param req - request object
 * @param res - response that contains the status object
 */
function guessLetter(req, res) {
  const letter = req.params.letter.toLowerCase();

  if (status.onGoing) {
    status.last = checkLetter(letter);

    if (status.last) {
      status.hits.push(letter);
    } else {
      status.misses.push(letter);
    }

    status.won = checkWon();
    if (status.won || status.misses.length > 9) {
      status.onGoing = false;
    }
  }

  // if gameover then we don't mind sending status.word to client
  // if you are confused by the conditional operator (?) checkout this page:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  const response = status.onGoing ? sanitizedStatus() : status;
  res.json(response);
}

app.post('/games/', createGame);
// for example /games/a will call guessLetter with letter = 'a'
app.post('/games/:letter', guessLetter);

app.listen(8080);

console.log('Server is running on port 8080. \
View it by visiting the following link in the browser: ');
console.log('http://localhost:8080/');
