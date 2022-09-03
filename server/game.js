import { v4 as uuidv4 } from 'uuid';
import * as helper from './helper.js';
import Postgres from 'pg';
import config from './config.js';

// create a new psql client with the configurations from the config file
const sqlClient = new Postgres.Client(config);
// attempt to connect to the database
let sqlConnected = false;
connectToDB();

/**
 * It connects to the database and sets the `sqlConnected` variable to `true` if successful.
 * Otherwise, it logs the error and exits the process.
 */
function connectToDB() {
  // try to connect, if there was any errors, log them as a console error
  sqlClient.connect(error => {
    if (error) {
      console.error(`Tried to connect to database, but ${error.stack}`);
      // process.exit(1); // kills the server
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

  const insertQuery = 'INSERT INTO game (id, word, hits, misses, onGoing, userWord, last, won) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  // join arrays into strings before inserting them into the database (we have defined their types as varchar)
  const values = [game.id, game.word, game.hits.join(''), game.misses.join(''), game.onGoing, game.userWord.join(''), game.last, game.won];
  // insert the game into the database
  await sqlClient.query(insertQuery, values);

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
      hits: firstRow.hits.split(''), // split the varchar into an array
      misses: firstRow.misses.split(''), // same here
      onGoing: firstRow.ongoing, // the column name is ongoing, but the property is onGoing
      userWord: firstRow.userword.split(''), // the column name is userword, but the property is userWord
      last: firstRow.last,
      won: firstRow.won,
    };
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
