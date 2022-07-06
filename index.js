const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// The array of guessed letters so far (if not guessed, it is '_')
let guessed = [];

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
* Starts a new game by choosing a new word from the words array
* and resetting the guessed letters array
* lastly it displays the word in the instructions section
*/
function startNewGame() {
  const word = randomElement(words);

  // Reset the guessed letters array and pupulate it with '_'s
  guessed = [];
  for (const letter of word) {
    guessed.push('_');
  }

  const instruct = document.querySelector('#instruct');
  instruct.textContent = guessed.join(' ');
}

/* 
* Draws the keyboard on the screen by creating a button for each letter
*/
function drawKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const keyboard = document.querySelector('#keyboard');

  for (const letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    keyboard.append(button);
  }
}

/* 
* Initializes the game by starting a new game and drawing the keyboard
*/
function init() {
  startNewGame();
  drawKeyboard();
}

// The init function will be called when the page loads
window.addEventListener('load', init);
