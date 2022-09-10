// we are using 'POST' to send a request to make a new game or check our guess
// we can't use 'GET' (for read-only requests) as we are changing `status` in `server/svr.js`
const POST = { method: 'POST' };

import {
  drawHangman,
} from './canvas.js';

import {
  safeRemove,
  create,
  drawKeyboard
} from './helper.js';

/**
 *  Stores the status of the game and has the following properties:
 * `hits` - an array of the letters that have been guessed correctly,
 * `misses` - an array of the letters that have been guessed incorrectly,
 * `onGoing` - a boolean that indicates if the game is still in progress,
 * `userWord` - an array of letters that has been guessed so far ('_' for unguessed letters),
 * `last` - a boolean that is true if the last guess was a hit,
 * `won` - a boolean that is true if the user has guessed the word,
 * `word` - the word to be guessed (only defined when game is over).
 */
let gameState = {};

/**
 * Stores the handles to the elements in the DOM (if exists):
 * `el.main` - the main element of the page (that contains all sections),
 * `el.canvas` - the canvas element ('#noose'),
 * `el.keyboard` - the keyboard section ('#keyboard'),
 * `el.instruct` - the instructions section ('#instruct'),
 * `el.feedback` - the feedback section ('#feedback').
 */
let el = {};

/**
 * Returns number of lives based on `gameState.misses` (if exists).
 * @returns number of lives
 */
function lives() {
  if (gameState.misses) {
    return 10 - gameState.misses.length;
  }
  return 0;
}

/**
 * Returns the union of the arrays `gameState.hits` and `gameState.misses`.
 * @returns union of hits and misses arrays
 */
function hitsAndMisses() {
  return gameState.hits.concat(gameState.misses);
}

/**
 * Displays `message` in the feedback section.
 * It also displays the lives left.
 * @param message - the message to display
 */
function feedback(message) {
  message += ` You have ${lives()} lives.`;
  el.feedback.textContent = message;
}

/**
 * Resets the keyboard and adds a button for a new game that calls `startNewGame` on click.
 */
function generateNewGame() {
  el.keyboard.textContent = '';

  const newGame = create('section', el.main, { id: 'newGame' });
  create('p', newGame, {},
    'Use the button or hit Enter/Space to start a new game.');
  const prompt = create('button', newGame, {}, 'Start a new game');

  prompt.addEventListener('click', startNewGame);
}

/**
 * Starts a new game by requesting a new `gameState` from the server.
 * redraws the hangman and keyboard, and displays a feedback message too.
 */
async function startNewGame() {
  safeRemove('#newGame');

  const response = await fetch('/games', POST);
  gameState = await response.json();

  redrawWord();
  drawKeyboard(el.keyboard);
  drawHangman(el.canvas, 10);
  feedback('Start clicking on the buttons or press a letter on the keyboard.');
}

/**
 * If `gameState.onGoing` is `true`, and the user clicked on an on-screen key, registers their guess
 * @param e - the click event object
 */
function checkClick(e) {
  if (gameState.onGoing) {
    const letter = e.target.dataset.letter;
    if (letter) {
      registerLetter(letter);
    }
  }
}

/**
 * If `gameState.onGoing` is `true`, and the user pressed on a letter on the keyboard, registers the letter
 * If `gameState.onGoing` is `false`, Enter and Space can be used to start a new game
 * @param e - the key press event object
 */
function checkKeyPress(e) {
  if (gameState.onGoing) {
    if (e.code.indexOf('Key') === 0) {
      registerLetter(e.code[3]);
    }
  } else {
    if (e.code === 'Space' || e.code === 'Enter') {
      startNewGame();
    }
  }
}

/**
 * If `gameState.onGoing` is `true` and user has made a new guess, requests the server to check  `letter`.
 * Displays a feedback to user, updates hangman and keyboard, and redraws the word.
 * Generates a new game on gameover.
 * @param letter - the letter that the user has guessed
 */
async function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (gameState.onGoing && letter.length === 1) {
    if (hitsAndMisses().includes(letter)) {
      feedback(`You already guessed ${letter}. Try another letter. 😇`);
    } else {
      const url = `/games/${letter}`;
      const response = await fetch(url, POST);
      gameState = await response.json();

      if (!gameState.last) {
        if (!gameState.onGoing) {
          let message = `You lost! Your last guess, '${letter}', was wrong. 😭`
          message += gameState.word ? ` The word was: '${gameState.word}'` : '';
          feedback(message);

          generateNewGame();
        }
        else {
          feedback(`Sorry! '${letter}' is not a letter in the word. ❌`);
        }

        drawHangman(el.canvas, lives());
      } else {
        redrawWord();

        if (gameState.won) {
          feedback(`You won! Well done! 🎉`);
          generateNewGame();
        }
        else {
          feedback(`Good job! '${letter}' is in the word. ✅`);
        }
      }

      redrawKeyboard();
    }
  }
}

/**
 * Removes the old `#guessMe` element, and creates a new one with the letters in `guessed`
 */
function redrawWord() {
  safeRemove('#guessMe');
  const guessMe = create('div', el.instruct, { id: 'guessMe' });

  for (const letter of gameState.userWord) {
    const char = create('span', guessMe, {}, letter);
    char.dataset.letter = letter;
    char.dataset.unknown = (letter === '_');
  }
}

/**
 * Updates the on-screen keyboard by disabling every button with a letter in `hits` or `misses`
 */
function redrawKeyboard() {
  const keyboardLetters = el.keyboard.querySelectorAll('[data-letter]');
  for (const letter of keyboardLetters) {
    const hitsAndMisses = gameState.hits.concat(gameState.misses);
    if (hitsAndMisses.includes(letter.dataset.letter)) {
      letter.disabled = true;
    }
  }
}

/**
 * Adds event listeners for the physical keyboard presses and the on-screen keyboard.
 */
function addEventListeners() {
  window.addEventListener('keydown', checkKeyPress);
  el.keyboard.addEventListener('click', checkClick);
}

/**
 * Selects the DOM elements that we'll be using and stores them in `el`.
 */
function prepareHandles() {
  el.keyboard = document.querySelector('#keyboard');
  el.instruct = document.querySelector('#instruct');
  el.feedback = document.querySelector('#feedback');
  el.main = document.querySelector('main');
  el.canvas = document.querySelector('#canvas');
}

/**
 * Prepares the game handles, listeners and starts a new game.
 */
function init() {
  prepareHandles();
  startNewGame();
  addEventListeners();
}

window.addEventListener('load', init);
