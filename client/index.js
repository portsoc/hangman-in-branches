import {
  drawHangman,
} from './canvas.js';

const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// Holds all of our game variables (hits and misses, onGoing, word, guessed)
let gameState = {};
// Stores all the needed DOM elements
let el = {};

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
 * If the letter is in the word, then update the guessed array with the letter
 * @param letter - the letter that the user guessed
 * @returns true if the letter is in the word, false otherwise
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
 * Checks whether the user has guessed the word
 * @returns true if the user has guessed the word, false otherwise
 */
function checkWon() {
  return gameState.guessed.join('') === gameState.word;
}

/**
 * Removes the keyboard and adds a button for a new game that calls startNewGame on click
 */
function generateNewGame() {
  el.keyboard?.remove();

  const newGame = document.createElement('section');
  newGame.id = 'newGame';
  el.main.append(newGame);

  const question = document.createElement('button');
  question.textContent = 'Start New Game';
  newGame.append(question);

  newGame.addEventListener('click', startNewGame);
}


/**
 * Starts a new game by choosing a new word from the words array
 * all the letters are replaced with '_'s and stored in guessed array
 * content of guessed is displayed in the instructions
 * onGoing is set to true and  drawKeyboard is called to draw the keyboard
 */
function startNewGame() {
  const newGame = document.querySelector('#newGame');
  newGame?.remove();

  gameState.word = randomElement(words);

  // Replace all the letters, ignoring the case, with '_' and store as array of characters
  gameState.guessed = gameState.word.replace(/[a-z]/ig, '_').split('');

  redrawWord();

  gameState.onGoing = true;
  gameState.hits = [];
  gameState.misses = [];

  drawKeyboard();
  // on a new game, and empty canvas is drawn
  drawHangman(el.canvas, 10);

  el.feedback.textContent = 'Start clicking on the buttons or press a letter on the keyboard.';
}

/**
 * Draws the keyboard on the screen by creating a button for each letter
 */
function drawKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboard = document.createElement('section');
  keyboard.id = 'keyboard';
  el.main.append(keyboard);
  el.keyboard = keyboard;

  for (const letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.dataset.letter = letter;
    keyboard.append(button);
  }
}

/**
 * If the game is on, and the user clicked on an on-screen key, registers the letter
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
 * If the game is on, and the user pressed on a letter on the keyboard, registers the letter
 * @param e - the key press event object
 */
function checkKeyPress(e) {
  if (gameState.onGoing) {
    if (e.code.indexOf('Key') === 0) {
      registerLetter(e.code[3]);
    }
  }
}

/**
 * If the user has lives left, it checks whether a given letter is in the word
 * if it is, it adds it to the `hits` array, otherwise to the `misses` array
 * it also updates the lives count and displays a feedback to user
 * @param letter - the letter that the user has guessed
 */
function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (gameState.misses.length < 10) {
    const hitsAndMisses = gameState.hits.concat(gameState.misses);
    if (hitsAndMisses.includes(letter)) {
      el.feedback.textContent =
        `You have already tried "${letter}".\nTry another letter. 😇`;
    } else {
      const found = checkLetter(letter);
      redrawWord();

      if (!found) {
        gameState.misses.push(letter);
        const newLives = 10 - gameState.misses.length;

        el.feedback.textContent = `${letter} is not in the word! ❌`;

        if (newLives > 1) {
          el.feedback.textContent += `\nYou have ${newLives} lives left.`;
        } else if (newLives === 0) {
          el.feedback.textContent += '\nGame Over, you lost!';
          gameState.onGoing = false;
          generateNewGame();
        }

        // update the hangman after a wrong guess
        drawHangman(el.canvas, newLives);
      } else {
        gameState.hits.push(letter);

        if (checkWon()) {
          el.feedback.textContent = 'You guessed it! Well done! 🎉';
          gameState.onGoing = false;
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
 * It removes the old `#guessMe` element, and creates a new one with the letters in the `guessed` array
 */
function redrawWord() {
  const oldGuessMe = document.querySelector('#guessMe');
  oldGuessMe?.remove();

  const guessMe = document.createElement('div');
  guessMe.id = 'guessMe';
  el.instruct.append(guessMe);

  for (const letter of gameState.guessed) {
    const char = document.createElement('span');
    char.textContent = letter;
    guessMe.append(char);

    char.dataset.letter = letter;
    char.dataset.unknown = (letter === '_');
  }
}

/**
 * Updates the on-screen keyboard by disabling every button whose letter has been guessed
 */
function redrawKeyboard() {
  const keyboard = document.querySelector('#keyboard');
  const keyboardLetters = keyboard.querySelectorAll('[data-letter]');
  for (const letter of keyboardLetters) {
    const hitsAndMisses = gameState.hits.concat(gameState.misses);
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
