const words = [
    'Jurassic Park', 'Star Wars', 'The Matrix',
    'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
    'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

// Takes the size of an array and returns an index from 0 to size-1
function randomIndex(size) {
    const index = Math.floor(Math.random() * size);
    return index;
}

// Takes an array and returns a randomly selected element
function randomElement(array) {
    const size = array.length;
    const index = randomIndex(size);
    const element = array[index];
    return element;
}

function startNewGame() {
    const instruct = document.querySelector('#instruct');
    const word = randomElement(words);
    // For every letter of the word, we display a "_" in instruct
    instruct.textContent = '_ '.repeat(word.length);
}

function drawKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyboard = document.querySelector('#keyboard');

    for (const letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        keyboard.append(button);
    }
}

function init() {
    drawKeyboard();
    startNewGame();
}

// The init function will be called when the page loads
window.addEventListener('load', init);