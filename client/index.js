import {
  drawHangman,
} from './canvas.js';

import {
  safeRemove,
  create,
  drawKeyboard,
} from './helper.js';

const POST = { method: 'POST' };
const GET = { method: 'GET' };

/**
 *  Stores the status of the game and has the following properties:
 * `id` - the id of the game,
 * `word` - the word to be guessed (only available if the game is lost),
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
const el = {};

/**
 * Returns number of lives based on `gameState.misses`, if it doesn't exist, it returns `0`.
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
 * It takes a message as an argument, and displays it in the feedback section.
 * It also displays the number of lives in the feedback section if the game is on.
 * @param message - the message to display
 */
function feedback(message) {
  if (gameState.onGoing) {
    message += ` You have ${lives()} lives left.`;
  }

  el.feedback.textContent = message;
}

/**
 * Removes the keyboard and adds a button for a new game that calls `startNewGame` on click.
 */
function generateNewGame() {
  safeRemove('#keyboard');

  const newGame = create('section', el.main, { id: 'newGame' });
  create('p', newGame, {},
    'Use the button or hit Enter/Space to start a new game.');
  const prompt = create('button', newGame, {}, 'Start a new game');
  prompt.classList.add('newGame');

  prompt.addEventListener('click', startNewGame);
}

/**
 * Starts a new game by requesting a new `gameState` from the server.
 * Removes the newGame element, prepares game handles and event listeners,
 * redraws the hangman and keyboard, and displays a feedback message too.
 */
async function startNewGame() {
  safeRemove('#newGame');
  const response = await fetch('/games', POST);
  gameState = await response.json();

  redrawWord();
  el.keyboard = drawKeyboard(el.main);
  resetNoose();
  feedback('Start clicking on the buttons or press a letter on the keyboard.');
  addEventListeners();
}

/*
 * Rehide each of the parts of the noose so
 * it can be reused in the next game.
 */
function resetNoose() {
  const hidden = el.canvas.querySelectorAll('[id]');
  hidden.forEach(x => x.classList.add('hide'));
}


/**
 * It requests the score of the game from the server and returns it if the game was won.
 * @returns The score of the game.
 */
async function getScore() {
  const url = `/games/${gameState.id}/score`;
  const response = await fetch(url, GET);
  const responseObject = await response.json();

  const score = responseObject.score ? responseObject.score : 0;
  return score;
}

/**
 * If the game is on, and the user clicked on an on-screen key, registers the letter.
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
 * If the game is on, and the user pressed on a letter on the keyboard, registers the letter.
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
 * If the game is ongoing and the user has made a new guess, requests the server to check a letter.
 * Depending on the server response, it also displays a feedback to user
 * and generates a new game if the game is won or no lives left.
 * The hangman and keyboard are updated too.
 * Otherwise (if no lives left or repetetive guess has been made) it skips the request
 * and just displays a feedback message.
 * @param letter - the letter that the user has guessed
 */
async function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (gameState.onGoing && letter.length === 1) {
    if (hitsAndMisses().includes(letter)) {
      feedback(`You already guessed '${letter}'. Try another letter. 😇`);
    } else {
      await sendGuess(letter);

      const wasHit = gameState.last;
      if (!wasHit) {
        if (!gameState.onGoing) {
          let message = `You lost! Your last guess, '${letter}', was wrong. 😭`;
          message += gameState.word ? ` The word was: '${gameState.word}'` : '';
          feedback(message);

          generateNewGame();
        } else {
          feedback(`Sorry! '${letter}' is not a letter in the word. ❌`);
        }
      } else {
        redrawWord();

        if (gameState.won) {
          const score = await getScore();
          feedback(`You won! Your score is ${score}, well done! 🎉`);
          generateNewGame();
        } else {
          feedback(`Good job! '${letter}' is in the word. ✅`);
        }
      }

      drawHangman(el.canvas, lives(), wasHit);
      redrawKeyboard();
    }
  }
}

/**
 * It sends a guess to the server and updates the game state
 * @param letter - The letter that the user guessed.
 */
async function sendGuess(letter) {
  const url = `/games/${gameState.id}/${letter}`;
  const response = await fetch(url, POST);
  gameState = await response.json();
}

/**
 * Updates the `guessMe` element based on `gameState.userWord`.
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
 * Updates the on-screen keyboard by disabling every button whose letter has been guessed.
 */
function redrawKeyboard() {
  const keyboard = document.querySelector('#keyboard');

  if (keyboard) {
    const keys = keyboard.querySelectorAll('[data-letter]');

    for (const key of keys) {
      const letter = key.dataset.letter;

      if (hitsAndMisses().includes(letter)) {
        key.disabled = true;

        key.classList.toggle('miss', gameState.misses.includes(letter));
        key.classList.toggle('hit', gameState.hits.includes(letter));
      }
    }
  }
}

/**
 * Adds event listeners for the physical keyboard presses and the on-screen keyboard (if exists).
 */
function addEventListeners() {
  window.addEventListener('keydown', checkKeyPress);
  el.keyboard?.addEventListener('click', checkClick);
}

/**
 * Selects the DOM elements that we'll be using and stores them in `el`.
 */
function prepareHandles() {
  el.instruct = document.querySelector('#instruct');
  el.feedback = document.querySelector('#feedback');
  el.main = document.querySelector('main');
  el.canvas = document.querySelector('#canvas');
}

/**
 * Prepares the game handles and starts a new game.
 */
function init() {
  prepareHandles();
  startNewGame();
}

window.addEventListener('load', init);
