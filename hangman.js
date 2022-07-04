const words = [
    'Jurassic Park', 'Star Wars', 'The Matrix',
    'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
    'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

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

let word = randomElement(words);
console.log(`The first randomly selected word is: ${word}`);

word = randomElement(words);
console.log(`The second randomly selected word is: ${word}`);
