const words = [
  'Jurassic Park', 'Star Wars', 'The Matrix',
  'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
  'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];

//TODO add comments
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function randomWord() {
  return words[randomNumber(words.length)];
}

let word = randomWord();
console.log(`The first randomly select word is: ${word}`);

word = randomWord();
console.log(`The second randomly select word is: ${word}`);
