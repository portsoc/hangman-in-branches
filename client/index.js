import {
  drawHangman,
} from './canvas.js';

import {
  safeRemove,
  create,
  drawKeyboard
} from './helper.js';

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// Holds all game variables (guessed, hits & misses arrays, onGoing boolean & word string)
let gameState = {};
// Stores all the needed DOM elements
let el = {};

/**
 * Takes the size of an array and returns a random index between 0 and size.
 * The number itself is not included in the range.
 * @param size - the size of the array
 * @returns a random index from the array
 */
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}

/**
 * Return a random element from the given array.
 * @param array - the array to choose a random element from
 * @returns a random element from the array
 */
function randomElement(array) {
  const size = array.length;
  const index = randomIndex(size);
  const element = array[index];
  return element;
}

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
 * Checks if `letter` is in the word, then update the guessed array with `letter`
 * @param letter - the letter that the user guessed
 * @returns `true` if the letter is in the word, `false` otherwise
 */
function checkLetter(letter) {
  let found = false;
  for (let i = 0; i < gameState.word.length; i++) {
    if (gameState.word[i].toLowerCase() === letter) {
      gameState.guessed[i] = gameState.word[i];
      found = true;
    }
  }

  return found;
}

/**
 * Checks whether the user has guessed `word`
 * @returns `true` if the user has guessed the word, `false` otherwise
 */
function checkWon() {
  return gameState.guessed.join('') === gameState.word;
}

/**
 * It takes a message as an argument, and displays it in the feedback section.
 * It also displays the lives left or a game over message.
 * @param message - the message to display
 */
function feedback(message) {
  const currentLives = lives();
  if (currentLives === 0) {
    message += ` You lost! The word was: ${gameState.word}`;
  } else {
    message += ` You have ${currentLives} lives left.`;
  }
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
 * Starts a new game by choosing a random word from `words`.
 * All the letters are replaced with '_'s and stored in `gameState.guessed` then displayed on screen.
 * `gameState.onGoing` is set to `true`. 
 * `gameState.hits` and `gameState.misses` are emptied.
 * The keyboard is drawn too.
 */
function startNewGame() {
  safeRemove('#newGame');

  gameState.word = randomElement(words);
  gameState.onGoing = true;
  gameState.hits = [];
  gameState.misses = [];
  gameState.guessed = gameState.word.replace(/[a-z]/ig, '_').split('');

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
 * @param e - the key press event object
 */
function checkKeyPress(e) {
  if (gameState.onGoing) {
    if (e.code.indexOf('Key') === 0) {
      registerLetter(e.code[3]);
    }
  } else {
    // a shortcut to restart the game, only works when gameState.onGoing is false
    if (e.code === 'Space' || e.code === 'Enter') {
      startNewGame();
    }
  }
}

/**
 * If the user has lives left, it checks whether a given letter is in the word.
 * If this is the case, the letter is added to the `gameState.hits`, otherwise to `gameState.misses`.
 * It also displays a feedback to user, updates the keyboard and the hangman.
 * Once user has guessed the word or lost, `gameState.onGoing` is set to `false` and `generateNewGame` is called.
 * @param letter - the letter that the user has guessed
 */
function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (lives() > 0) {
    if (hitsAndMisses().includes(letter)) {
      feedback(`You already guessed ${letter}. Try another letter. 😇`);
    } else {
      const found = checkLetter(letter);
      redrawWord();

      if (!found) {
        gameState.misses.push(letter);
        feedback(`${letter} is not in the word! ❌`);

        const currentLives = lives();
        if (currentLives === 0) {
          gameState.onGoing = false;
          generateNewGame();
        }

        drawHangman(el.canvas, currentLives);
      } else {
        gameState.hits.push(letter);

        if (checkWon()) {
          feedback(`You won! Well done! 🎉`);
          gameState.onGoing = false;
          generateNewGame();
        } else {
          feedback(`${letter} is in the word! ✅`);
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

  for (const letter of gameState.guessed) {
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
    const hitsAndMisses = hits.concat(misses);
    if (hitsAndMisses.includes(letter.dataset.letter)) {
      letter.disabled = true;
    }
  }
}

/**
 * It adds event listeners for the physical keyboard presses and the on-screen keyboard.
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
 * Prepares the game handles, starts a new game and adds event listeners.
 */
function init() {
  prepareHandles();
  startNewGame();
  addEventListeners();
}

window.addEventListener('load', init);
