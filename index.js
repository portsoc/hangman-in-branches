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
* it also displays a message in the feedback section accordingly
*/
// TODO should only be called on unused words, also non alphabetical should be visible
function checkLetter(letter) {
  letter = letter.trim().toLowerCase();
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter) {
      guessed[i] = word[i];
      found = true;
    }
  }

  el.feedback.textContent = `${letter} is ${found ? '' : 'not'} in the word`;

}

/* 
* Starts a new game by choosing a new word from the words array
* and resetting the guessed letters array populating it with '_'s
* lastly it displays the word in the instructions section
*/
function startNewGame() {
  word = randomElement(words);

  guessed = [];
  for (let i = 0; i < word.length; i++) {
    guessed.push('_');
  }

  el.instruct.textContent = guessed.join(' ');
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
 * Respond to press of keys on the physical keyboard
 */
function checkKeyPress(e) {
  console.log(e);
  if (e.code.indexOf('Key') === 0) {
    registerLetter(e.code[3]);
  }
}

/*
* Responds to the click of the on-screen keyboard
*/
function checkClick(e) {
  const letter = e.target.dataset.letter;
  if (letter) {
    registerLetter(letter);
  }
}

/*
* Checks if the letter is in the word and updates the guessed letters array
* it also updates the guessed word in the insntruct section
*/
function registerLetter(letter) {
  checkLetter(letter);
  el.instruct.textContent = guessed.join(' ');
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
