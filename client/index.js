import {
  drawHangman,
} from './canvas.js';

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// Array of guessed letters so far (if not guessed, it is '_')
let guessed = [];
// Word that the user needs to guess
let word;
// Stores all the needed DOM elements
let el = {};
// Stores the number of lives
let lives;
// True if the game is still on going
let onGoing = false;
// The guessed letters are either misses and hits
let misses;
let hits;

/**
 * Takes the size of an array and returns a random index between 0 and size
 * the number itself is not included in the range
 * @param size - The size of the array.
 * @returns A random index from the array.
 */
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}

/**
 * Returns a random element from the given array.
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
 * Checks if `letter` is in the word, then update the guessed array with `letter`
 * @param letter - the letter that the user guessed
 * @returns `true` if `letter` is in the word, false otherwise
 */
function checkLetter(letter) {
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter) {
      guessed[i] = word[i];
      found = true;
    }
  }

  return found;
}

/**
 * Checks whether the user has guessed `word`
 * @returns `true` if the user has guessed `word`, `false` otherwise
 */
function checkWon() {
  return guessed.join('') === word;
}

/**
 * Removes the keyboard and adds a button for a new game that calls `startNewGame` on click
 */
function generateNewGame() {
  el.keyboard.textContent = '';

  const newGame = document.createElement('section');
  newGame.id = 'newGame';
  el.main.append(newGame);

  const prompt = document.createElement('button');
  prompt.textContent = 'Start New Game';
  newGame.append(prompt);

  prompt.addEventListener('click', startNewGame);
}


/**
 * Starts a new game by choosing a new word from `words`
 * all the letters are replaced with '_'s and stored in `guessed` which is then displayed to user.
 * `lives` is set to 10, arrays `hits` and `misses` are emptied
 * `onGoing` is set to `true` and the keyboard is drawn too.
 */
function startNewGame() {
  const newGame = document.querySelector('#newGame');
  newGame?.remove();

  word = randomElement(words);

  // Replace all the letters, ignoring the case, with '_' and store as array of characters
  guessed = word.replace(/[a-z]/ig, '_').split('');

  redrawWord();

  lives = 10;
  onGoing = true;
  hits = [];
  misses = [];

  drawKeyboard();
  // on a new game, and empty canvas is drawn
  drawHangman(el.canvas, lives);

  el.feedback.textContent = 'Start clicking on the buttons or press a letter on the keyboard.';
}

/**
 * Draws the keyboard on the screen
 */
function drawKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (const letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.dataset.letter = letter;
    el.keyboard.append(button);
  }
}

/**
 * If `onGoing` is `true`, and the user clicked on an on-screen key, registers their guess
 * @param e - the click event object
 */
function checkClick(e) {
  if (onGoing) {
    const letter = e.target.dataset.letter;
    if (letter) {
      registerLetter(letter);
    }
  }
}

/**
 * If `onGoing` is `true`, and the user pressed on a letter on the keyboard, registers the letter
 * @param e - the key press event object
 */
function checkKeyPress(e) {
  if (onGoing) {
    if (e.code.indexOf('Key') === 0) {
      registerLetter(e.code[3]);
    }
  }
}

/**
 * If the user has lives left, it checks whether `letter` is in `word`.
 * If it is, it adds it to the `hits` array, otherwise to the `misses` array.
 * It also updates `lives` and displays a feedback to user.
 * @param letter - the letter that the user has guessed
 */
function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (lives > 0) {
    const hitsAndMisses = hits.concat(misses);
    if (hitsAndMisses.includes(letter)) {
      el.feedback.textContent =
        `You have already tried "${letter}".\nTry another letter. 😇`;
    } else {
      const found = checkLetter(letter);
      redrawWord();

      if (!found) {
        misses.push(letter);

        lives--;
        el.feedback.textContent = `${letter} is not in the word! ❌`;

        if (lives >= 1) {
          el.feedback.textContent += `\nYou have ${lives} lives left.`;
        } else if (lives === 0) {
          el.feedback.textContent += '\nGame Over, you lost!';
          onGoing = false;
          generateNewGame();
        }

        // update the hangman after a wrong guess
        drawHangman(el.canvas, lives);
      } else {
        hits.push(letter);

        if (checkWon()) {
          el.feedback.textContent = 'You guessed it! Well done! 🎉';
          onGoing = false;
          generateNewGame();
        } else {
          el.feedback.textContent = `${letter} is in the word! ✅`;
        }
      }

      // update the keyboard only when a new guess is made
      redrawKeyboard();
    }
  }
}

/**
 * Removes the old `#guessMe` element, and creates a new one with the letters in `guessed`
 */
function redrawWord() {
  const oldGuessMe = document.querySelector('#guessMe');
  oldGuessMe?.remove();

  const guessMe = document.createElement('div');
  guessMe.id = 'guessMe';
  el.instruct.append(guessMe);

  for (const letter of guessed) {
    const char = document.createElement('span');
    char.textContent = letter;
    guessMe.append(char);

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
 * It adds event listeners for the physical keyboard presses and the on-screen keyboard
 */
function addEventListeners() {
  window.addEventListener('keydown', checkKeyPress);
  el.keyboard.addEventListener('click', checkClick);
}

/**
 * Selects the DOM elements that we'll be using and stores them in `el`
 */
function prepareHandles() {
  el.keyboard = document.querySelector('#keyboard');
  el.instruct = document.querySelector('#instruct');
  el.feedback = document.querySelector('#feedback');
  el.main = document.querySelector('main');
  el.canvas = document.querySelector('#canvas');
}

/**
 * It prepares the game handles, starts a new game and adds event listeners
 */
function init() {
  prepareHandles();
  startNewGame();
  addEventListeners();
}

window.addEventListener('load', init);
