import { v4 as uuidv4 } from 'uuid';
import * as helper from './helper.js';
import Postgres from 'pg';
import config from './config.js';

// create a new psql client with the configurations from the config file
const sqlClient = new Postgres.Client(config);
// attempt to connect to the database
let sqlConnected = false;
sqlClient.connect(err => {
  if (err) {
    console.error(`Tried to connect to database, but ${err.stack}`);
  } else {
    sqlConnected = true;
  }
});

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
 * Creates a new game object and adds it to the `game` table.
 * It also returns a sanitized copy of the game game object.
 * @returns The sanitized game object.
 */
export async function createGame() {
  // TODO: We need to do better than this!
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

  // insert the game into the database
  const insertQuery = 'INSERT INTO game (id, word, hits, misses, onGoing, userWord, last, won) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  await sqlClient.query(insertQuery, Object.values(game));

  return sanitizedGame(game);
}

/**
 * Given a game, check if a given letter is in the game's word.
 * It also updates the `userWord` of the game.
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
 * Given a game's id, if the game exists and is ongoing, it checks if a given letter is in the word.
 * If this was the case, we add it to hits array, otherwise we add it to the misses array.
 * If the user has fully guessed the word or has no lives left, then we end the game.
 * The sanitized game is returned (or the full game on gameover).
 * @param id - The unique identifier for the game
 * @param letter - The letter to check
 * @returns The game object.
 */
export async function guessLetter(id, letter) {
  // TODO: We need to do better than this!
  if (!sqlConnected) {
    return null;
  }

  letter = letter.toLowerCase();

  const game = await getGame(id);
  // if the game exists and is ongoing
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

    // update the game in the database
    const updateQuery = 'UPDATE game SET hits = $1, misses = $2, onGoing = $3, userWord = $4, last = $5, won = $6 WHERE id = $7;';
    await sqlClient.query(updateQuery, [game.hits, game.misses, game.onGoing, game.userWord, game.last, game.won, id]);

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

  // TODO: We need to parse the result better than this!
  if (result.rows.length > 0) {
    const game = {
      id: result.rows[0].id,
      word: result.rows[0].word,
      hits: JSON.parse('[' + result.rows[0].hits.slice(1, result.rows[0].hits.length - 1) + ']'),
      misses: JSON.parse('[' + result.rows[0].misses.slice(1, result.rows[0].misses.length - 1) + ']'),
      onGoing: result.rows[0].ongoing,
      userWord: JSON.parse('[' + result.rows[0].userword.slice(1, result.rows[0].userword.length - 1) + ']'),
      last: result.rows[0].last,
      won: result.rows[0].won,
    };
    console.log(game);
    return game;
  }
}

/**
 * Game is won, respond with a score based on the number of misses, otherwise and error message.
 * @param id - The unique identifier for the game
 * @returns The score if the game is won, otherwise an error message.
 */
export async function calculateScore(id) {
  // TODO: We need to do better than this!
  if (!sqlConnected) {
    return null;
  }

  let score = 'Error in calcularing the score.';

  const game = await getGame(id);
  // if the game exists and has been won
  if (game?.won) {
    score = 1 / (1 + game.misses.length) * 1000;
    score = Math.round(score);
  }
  return score;
}
