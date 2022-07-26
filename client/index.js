const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// Array of guessed letters so far (if not guessed, it is '_')
let guessed = [];
// Word that the user needs to guess
let word;
// Stores all the needed DOM elements, will be set in prepareHandles
let el = {};
// Stores the number of lives, will be set in startNewGame
let lives;
// True if the game is still on going otherwise false (user won or lost)
let onGoing = false;
// We split the letters the user guessed into two arrays: misses and hits
let misses;
let hits;
/* 
 * Takes a number and returns a random index between 0 and that number
 * The number itself is not included in the range
 */
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}

/*
 * Takes a an array and returns a random element from that array
 */
function randomElement(array) {
  const size = array.length;
  const index = randomIndex(size);
  const element = array[index];
  return element;
}

/*
 * Checks if the letter is in the word and updates the guessed letters array
 * it then retruns true if the letter is in the word otherwise false
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

/*
 * Returns true if the user has guessed the word
 */
function checkWon() {
  return guessed.join('') === word;
}

/*
 * Removes the keyboard from the screen and instead displays a button for a new game
 */
function generateNewGame() {
  el.keyboard?.remove();// if there is a keyboard, remove it
  // for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

  const newGame = document.createElement('section');
  newGame.id = 'newGame';
  el.main.append(newGame);

  const question = document.createElement('button');
  question.textContent = 'Start New Game';
  newGame.append(question);

  newGame.addEventListener('click', startNewGame);
}

/* 
 * Starts a new game by choosing a new word from the words array
 * all the alphabetical characters are replaced with '_'s and stored in guessed
 * it displays guessed as a word in the instructions
 * it resets the lives, hits and misses and turns onGoing to true
 * calls drawKeyboard to draw the keyboard (that is removed from the screen on restart)
 */
function startNewGame() {
  const newGame = document.querySelector('#newGame');
  newGame?.remove(); // if there is a newGame element, remove it
  // for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

  word = randomElement(words);

  // Using a regular expression, replaces every alphabetical character, ignoring the case, with '_'
  // It then splits the string into an array of characters
  // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  guessed = word.replace(/[a-z]/ig, '_').split('');

  redrawWord();

  lives = 10;
  onGoing = true;
  hits = [];
  misses = [];

  drawKeyboard();

  el.feedback.textContent = `Start clicking on the buttons or press a letter on the keyboard.`;
}

/* 
 * Draws the keyboard on the screen by creating a button for each letter
 */
function drawKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboard = document.createElement('section');
  keyboard.id = 'keyboard';
  el.main.append(keyboard);
  // this is moved from prepareHandles to here
  el.keyboard = keyboard;

  for (const letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.dataset.letter = letter;
    keyboard.append(button);
  }
}

/*
 * Responds to the on-screen keyboard only if game is on going
 */
function checkClick(e) {
  if (onGoing) {
    const letter = e.target.dataset.letter;
    if (letter) {
      registerLetter(letter);
    }
  }
}

/*
 * Respond to the keys on the physical keyboard if the game is on going
 */
function checkKeyPress(e) {
  if (onGoing) {
    if (e.code.indexOf('Key') === 0) {
      registerLetter(e.code[3]);
    }
  }
}

/*
 * If the user has lives left, it checks whether a given letter is in the word
 * it updates hits, misses and guessed letters array and guessed word in insntruct
 * it then updates count of lives and displays a feedback to user
 */
function registerLetter(letter) {
  letter = letter.trim().toLowerCase();

  if (lives > 0) {
    const hitsAndMisses = hits.concat(misses);
    if (hitsAndMisses.includes(letter)) {
      el.feedback.textContent =
        `You have already tried "${letter}".\nTry another letter. 😇`;
    } else {
      // this updates the guessed letter array too
      const found = checkLetter(letter);
      redrawWord();
      redrawKeyboard();

      if (!found) {
        misses.push(letter);

        // this part is the same regardless of number of lives
        lives--;
        el.feedback.textContent = `${letter} is not in the word! ❌`;

        if (lives >= 1) {
          el.feedback.textContent += `\nYou have ${lives} lives left.`;
        } else if (lives === 0) {
          el.feedback.textContent += `\nGame Over, you lost!`;
          onGoing = false;
          generateNewGame();
        }
      } else {
        hits.push(letter);

        if (checkWon()) {
          el.feedback.textContent = `You guessed it! Well done! 🎉`;
          onGoing = false;
          generateNewGame();
        } else {
          el.feedback.textContent = `${letter} is in the word! ✅`;
        }
      }
    }
  }
}

/*
  * Creates an element with id guessMe in the instructions section
  * For every letter a span is created in guessMe
  */
function redrawWord() {
  const oldGuessMe = document.querySelector('#guessMe');
  // first time we call redrawWord, there may be no guessMe element
  oldGuessMe?.remove(); // removes the old guessMe element if it exists
  // for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining


  const guessMe = document.createElement('div');
  guessMe.id = 'guessMe';
  el.instruct.append(guessMe);

  for (const letter of guessed) {
    // const char = create('span', guessMe, {}, letter);
    const char = document.createElement('span');
    char.textContent = letter;
    guessMe.append(char);

    char.dataset.letter = letter;
    char.dataset.unknown = (letter === '_'); // false if letter has been guessed
  }
}

/*
  * Updates the on-screen keyboard by disabling every button whose letter has been guessed
  */
function redrawKeyboard() {
  const keyboard = document.querySelector('#keyboard');
  const keyboardLetters = keyboard.querySelectorAll('[data-letter]');
  for (const letter of keyboardLetters) {
    const hitsAndMisses = hits.concat(misses);
    if (hitsAndMisses.includes(letter.dataset.letter)) {
      letter.disabled = true;
    }
  }
}

/*
 * Adds event listeners to the on-screen keyboard and the physical keyboard
 */
function addEventListeners() {
  window.addEventListener('keydown', checkKeyPress);
  el.keyboard.addEventListener('click', checkClick);
}

/*
 * Selects needed DOM elements and stores them in the global el object
 */
function prepareHandles() {
  el.instruct = document.querySelector('#instruct');
  el.feedback = document.querySelector('#feedback');
  el.main = document.querySelector('main');
}

/* 
 * Starts by adding handles to key DOM elements to the el object
 * it then starts a new game and draws the keyboard
 * it also adds event listeners to the on-screen and physical keyboard
 */
function init() {
  prepareHandles();
  startNewGame();
  addEventListeners();
}

window.addEventListener('load', init);
