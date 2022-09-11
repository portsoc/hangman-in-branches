import { v4 as uuidv4 } from 'uuid';
import { words } from './data.js';
import * as helper from './helper.js';


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

/**
 * It returns a copy of the status object, but without the word property
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
 * It also returns a sanitized copy of the game status object.
 * @returns The sanitized status object.
 */
export function createGame() {
  const id = uuidv4();
  const word = helper.randomElement(words);

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

  return sanitizedStatus(id);
}

/**
 * Checks if a `letter` is in the word of the game with the given id, then updates its `userWord`.
 * @param letter - The letter that the user guessed
 * @param id - The unique identifier for the game
 * @returns `true` if the letter is in the word, `false` otherwise
 */
function checkLetter(letter, id) {
  const game = gamesInPlay[id];

  if (!game) {
    return false;
  }

  let found = false;
  const lowerCaseWord = game.word.toLowerCase();

  for (let i = 0; i < game.word.length; i++) {
    if (lowerCaseWord[i] === letter.toLowerCase()) {
      game.userWord[i] = game.word[i];
      found = true;
    }
  }

  return found;
}

/**
 * Given a game's id, checks whether the user has guessed the word.
 * @param id - The unique identifier for the game
 * @returns `true` if the user has guessed the word, `false` otherwise
 */
function checkWon(id) {
  const game = gamesInPlay[id];

  if (!game) {
    return false;
  }

  return game.userWord.join('') === game.word;
}

/**
 * Given a game's id, if the game exists and its `onGoing` is `true`, checks if `letter` is in its word.
 * If this was the case, we add it to the game's `hits` otherwise to `misses`.
 * If the user has fully guessed the word or has no lives left, then sets its `onGoing` to `false`.
 * The sanitized game status is returned (or the full status on gameover).
 * @param id - The unique identifier for the game
 * @param letter - The letter to check
 * @returns The status object.
 */
export function guessLetter(id, letter) {
  letter = letter.toLowerCase();
  const game = gamesInPlay[id];

  if (game?.onGoing) {
    game.last = checkLetter(letter, id);

    if (game.last) {
      game.hits.push(letter);
    } else {
      game.misses.push(letter);
    }

    game.won = checkWon(id);
    if (game.won || game.misses.length > 9) {
      game.onGoing = false;
    }

    return game.onGoing ? sanitizedStatus(id) : game;
  }
}

/**
 * Given the id of a game, if it's won, responds with a score, otherwise an error.
 * @param id - The unique identifier for the game
 * @returns The score if the game is won, otherwise an error message.
 */
export function calculateScore(id) {
  let score = 'Error in calcularing the score.';
  const game = gamesInPlay[id];

  if (game?.won) {
    score = 1 / (1 + game.misses.length) * 1000;
    score = Math.round(score);
  }
  return score;
}
