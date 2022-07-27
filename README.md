<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 1: Functions

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

## Objectives

We have defined an array of movie titles called `words`.
One of them needs to be selected for the hangman game.
Instead of manually selecting elements from our `words` array, we want to pick them out randomly.

We first need to select a random index of our array.
Then we can use that index to select the element from our array.

We will be grouping lines of code for each task into functions and then calling our functions to get our results.

If you find the code confusing here and have not yet visited
[Code Examples to Copy](https://portsoc.github.io/code-copy-examples/)
make sure you attempt the first 3 stages before going any further:

- [Stage 1](https://portsoc.github.io/code-copy-examples)
- [Stage 2](https://portsoc.github.io/code-copy-examples/stage-2)
- [Stage 3](https://portsoc.github.io/code-copy-examples/stage-3)

## Implementation

We start by writing the `randomIndex` function to select a random index of an array given its length.

Next, we will use `randomIndex` within a new function: `randomElement`.
This function will take an array and return a random element from it.

Note that both of these functions have a block of comments before them.
The comments explain what the functions take as inputs and what they do.

Lastly, we will test `randomElement` by calling it twice and printing the randomly selected element that it returns.

[Visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/0...1?diff=split) to see all the differences between branches 0 (previous branch) and 1 (this branch).

## Usage

Navigate to the `hangman` folder in a shell or open a new terminal in your editor and run the following command:

```
node hangman.js
```

This runs the `hangman.js` script which selects two random elements from `words` and prints them in the console.

## Further Exploration

Make sure to run this script multiple times.
Does the output change each time you run it?

Why is `word` defined using the `let` keyword instead of `const`?

<p align="right">(<a href="#top">back to top</a>)</p>
