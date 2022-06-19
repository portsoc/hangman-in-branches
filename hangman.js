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
    const element = array[randomIndex(size)];
    return element;
}

let word = randomElement(words);
console.log(`The first randomly selected word is: ${word}`);

word = randomElement(words);
console.log(`The second randomly selected word is: ${word}`);