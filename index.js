const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// The array of guessed letters so far (if not guessed, it is '_')
let guessed = [];
// The word that the user needs to guess
let word;
// Stores all the needed DOM elements
let el = {};
// Stores the number of lives the user has
let lives;
// True if the game is still on going and false (user won or lost)
let onGoing = false;

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
* it then retruns the true if the letter is in the word and false otherwise
*/
function checkLetter(letter) {
  letter = letter.trim().toLowerCase();
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
* Starts a new game by choosing a new word from the words array
* and resetting the guessed letters array populating it with '_'s
* next it displays the word in the instructions section
* lastly it resets the lives counter and turns the game on
*/
function startNewGame() {
  word = randomElement(words);

  guessed = [];
  for (let i = 0; i < word.length; i++) {
    guessed.push('_');
  }

  el.instruct.textContent = guessed.join(' ');

  lives = 9;
  onGoing = true;
}

/* 
* Draws the keyboard on the screen by creating a button for each letter
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
* Responds to the on-screen keyboard if the game is on going
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
* If the user has lives left it checks if letter is in the word
* it updates the guessed letters array and guessed word in insntruct section
* then it updates the number of lives and displays a feedback to user
*/
function registerLetter(letter) {
  if (lives > 0) {
    // this updates the guessed letter array too
    const found = checkLetter(letter);
    el.instruct.textContent = guessed.join(' ');

    if (!found) {
      // this part is the same regardless of number of lives
      lives--;
      el.feedback.textContent = `${letter} is not in the word! ❌`;

      // if the lives is greater than 1, the user can still play
      if (lives > 1) {
        el.feedback.textContent += `\nYou have ${lives} lives left.`;
      } else if (lives === 1) {
        el.feedback.textContent += `\nGame Over, you lost! 😭`;
        onGoing = false;
      }
    } else {
      // the feedback differs if the user has guessed the word
      if (checkWon()) {
        el.feedback.textContent = `You guessed it! Well done! 🎉`;
        onGoing = false;
      }
      else {
        el.feedback.textContent = `${letter} is in the word, keep it up! 👍`;
      }
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
* Selects needed DOM elements and stores them in global the el object
*/
function prepareHandles() {
  el.keyboard = document.querySelector('#keyboard');
  el.instruct = document.querySelector('#instruct');
  el.feedback = document.querySelector('#feedback');
}

/* 
* Initializes the game by first preparing handles to the DOM elements
* then it starts a new game and draws the keyboard
* it also adds an event listener to the on-screen and physical keyboard
*/
function init() {
  prepareHandles();
  startNewGame();
  drawKeyboard();
  addEventListeners();
}

// The init function will be called when the page loads
window.addEventListener('load', init);
