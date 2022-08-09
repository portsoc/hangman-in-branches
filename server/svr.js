import express from 'express';

const app = express();
app.use(express.static('client'));

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

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
 * Creates a new game by resettting the properties of `status` variable:
 * `word` - the word to be guessed,
 * `hits` - an array of the letters that have been guessed correctly,
 * `misses` - an array of the letters that have been guessed incorrectly,
 * `onGoing` - a boolean that indicates if the game is still in progress,
 * `userWord` - an array of letters that has been guessed so far ('_' for unguessed letters).
 */
function createGame() {
  status.word = randomElement(words);
  status.onGoing = true;
  status.hits = [];
  status.misses = [];
  status.userword = gameState.word.replace(/[a-z]/ig, '_').split('');

  // use the spread operator to copy the object otherwise it will be a reference to the same object
  const sanitizedStatus = { ...status };
  delete sanitizedStatus.word;
  return sanitizedStatus;
}

app.post('/games/', createGame);

app.listen(8080);

console.log('Server is running on port 8080. View it by visiting the following link in the browser:');
console.log('http://localhost:8080/');
