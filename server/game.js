import { v4 as uuidv4 } from 'uuid';
import * as helper from './helper.js';
import Postgres from 'pg';
import config from './config.js';

const sqlClient = new Postgres.Client(config);

let sqlConnected = false;
connectToDB();

/**
 * It connects to the database and sets the `sqlConnected` variable to `true` if successful.
 * Otherwise, it logs the error and exits the process.
 */
function connectToDB() {
  sqlClient.connect(error => {
    if (error) {
      console.error(`Tried to connect to database, but ${error.stack}`);
    } else {
      sqlConnected = true;
    }
  });
}

/**
 * It takes a game and returns a copy of it, but with the word property removed
 * @param game - The game to be copied.
 * @returns The sanitized game.
 */
function sanitizedGame(game) {
  const result = { ...game };
  delete result.word;
  return result;
}

/**
 * Creates a new game object and adds it to the database and returns a sanitized copy.
 * @returns The sanitized game object.
 */
export async function createGame() {
  if (!sqlConnected) {
    return null;
  }

  const id = uuidv4();
  const words = helper.readWords();
  const word = helper.randomElement(words);

  const game = {
    id,
    word,
    hits: [],
    misses: [],
    onGoing: true,
    userWord: helper.blankWord(word),
    last: false,
    won: false,
  };

  const insertQuery =
    'INSERT INTO game (id, word, hits, misses, onGoing, userWord, last, won) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const values =
    [game.id, game.word, game.hits.join(''), game.misses.join(''), game.onGoing, game.userWord.join(''), game.last, game.won];
  await sqlClient.query(insertQuery, values);

  return sanitizedGame(game);
}

/**
 * Checks if `letter` is in `game.word` and updates `game.userWord` accordingly.
 * Returns `true` if the letter was in the word, `false` otherwise.
 * @param game - The game
 * @param letter - The letter that the user guessed
 * @returns `true` if the letter is in the word, `false` otherwise
 */
function checkLetter(game, letter) {
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
 * Given a game, checks whether the user has guessed the word.
 * @param game - The game to check
 * @returns `true` if the user has guessed the word, `false` otherwise
 */
function checkWon(game) {
  return game.userWord.join('') === game.word;
}

/**
 * Given a game's id, if the game exists and is on going, it checks if a given letter is in the word.
 * If this was the case, we add it to the game's `hits` otherwise to `misses`.
 * If the user has fully guessed the word or has no lives left, then sets its `onGoing` to `false`.
 * The sanitized game status is returned (or the full status on gameover).
 * @param id - The unique identifier for the game
 * @param letter - The letter to check
 * @returns The game object.
 */
export async function guessLetter(id, letter) {
  if (!sqlConnected) {
    return null;
  }

  letter = letter.toLowerCase();

  const game = await getGame(id);

  if (game?.onGoing) {
    game.last = checkLetter(game, letter);

    if (game.last) {
      game.hits.push(letter);
    } else {
      game.misses.push(letter);
    }

    game.won = checkWon(game);
    if (game.won || game.misses.length > 9) {
      game.onGoing = false;
    }

    const updateQuery = 'UPDATE game SET hits = $1, misses = $2, onGoing = $3, userWord = $4, last = $5, won = $6 WHERE id = $7;';
    const values = [game.hits.join(''), game.misses.join(''), game.onGoing, game.userWord.join(''), game.last, game.won, id];
    await sqlClient.query(updateQuery, values);

    return game.onGoing ? sanitizedGame(game) : game;
  }
}

/**
 * It takes an id, queries the database for a game with that id, and returns the game
 * @param id - The id of the game to get.
 * @returns The game object
 */
async function getGame(id) {
  const selectQuery = 'SELECT * FROM game WHERE id = $1;';
  const result = await sqlClient.query(selectQuery, [id]);

  if (result.rows.length > 0) {
    const firstRow = result.rows[0];

    return {
      id: firstRow.id,
      word: firstRow.word,
      hits: firstRow.hits.split(''),
      misses: firstRow.misses.split(''),
      onGoing: firstRow.ongoing,
      userWord: firstRow.userword.split(''),
      last: firstRow.last,
      won: firstRow.won,
    };
  }
}

/**
 * Given the id of a game, if it's won, responds with a score, otherwise an error.
 * @param id - The unique identifier for the game
 * @returns The score if the game is won, otherwise an error message.
 */
export async function calculateScore(id) {
  if (!sqlConnected) {
    return null;
  }

  let score = 'Error in calcularing the score.';

  const game = await getGame(id);
  if (game?.won) {
    score = 1 / (1 + game.misses.length) * 1000;
    score = Math.round(score);
  }
  return score;
}
