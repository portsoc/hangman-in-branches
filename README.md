<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 1: Functions

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- 1: Functions (current branch)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- [5: Debugging](https://github.com/portsoc/hangman-in-branches/tree/5)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- [8: Server Part 1](https://github.com/portsoc/hangman-in-branches/tree/8)
- [9: Server Part 2](https://github.com/portsoc/hangman-in-branches/tree/9)
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

Every time the user plays our hangman game, we want to pick a word from the `words` array and let them guess it.
Instead of manually selecting elements for them, we want to pick them out randomly.

To do this, we need to select a random index of our array.
Then we can use that index to select the element from our array.

While writing the code for this, we will also aim to group the lines of code that are related to each other and make them into a function.
We can then call our functions instead of running the code inside them.

Please attempt the tests in the
[the j201 repository](https://github.com/portsoc/js201)
if you have not already done so.

## Implementation

To create a random number in JavaScript, we can use the `Math.random()` function.
This function returns a random number between 0 and 1:
  
```js
console.log(Math.random()); // an example output: 0.6096158396954363
```

But since our array has 9 elements, we need a random number between 0 and 8.
We can do this by multiplying the result of `Math.random()` by 9:

```js
console.log(Math.random() * 9); // an example output: 6.598487406180995
```

But this number is not an integer.
We can use the `Math.floor()` function to round down to the nearest integer:

```js
console.log(Math.floor(Math.random() * 9)); // an example output: 6
```

Let's replace the number 9 with a variable called `size` so we can put this code inside a function that returns a random index of an array given its size:

```js
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}
```

Naturally, we have named this function `randomIndex`.
It is always a good idea to name your functions in a way that describes what they do.

Similarly, we have defined a `randomElement` function.
Check the code to see how `randomElement` uses `randomIndex` to select a random element from an array.
This function will take an array and return a random element from it.

Once we have defined our functions, we can use them, as many times as we want, to select a random word from our `words` array:

```js
let word = randomElement(words);
console.log(word); // an example output: "The Matrix"
word = randomElement(words);
console.log(word); // an example output: "The Lord of the Rings"
```

**Pro tip**: Note that both of these functions have a block of comments before them.
The comments explain what the functions take as inputs and what they do.
This is a great practice to get into.
The syntax for writing a block of comments in JavaScript is:

```js
/*
  This is a block of comments.
  It can be used to explain what a function does.
*/
```

[Visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/0...1?diff=split) to see all the differences between branches 0 (previous branch) and 1 (this branch).

## Usage

Navigate to the `hangman` folder in a shell or open a new terminal in your editor and run the following command (see previous branches for more details):

```
node hangman.js
```

This runs the `hangman.js` script which selects two random elements from `words` and prints them in the console.

## Further Exploration

Make sure to run this script multiple times.
Does the output change each time you run it?

Can you guess why is `word` defined using the `let` keyword instead of `const`?

<p align="right">(<a href="#top">back to top</a>)</p>
