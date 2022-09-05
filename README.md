<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 1: Functions

<!-- Navigation -->
<details>
  <summary>Navigate between branches</summary>  
  <nav class="menu">
    <li><a href="https://github.com/manighahrmani/hangman-in-branches">Intro</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/0">0: Variables</a></li>
    <li>1: Functions (this branch)</li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/2">2: NPM</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/3">3: DOM</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/4">4: Events</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/5">5: Debugging</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/6">6: Canvas</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/7">7: Modularisation</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/8">8: Server Part 1</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/9">9: Server Part 2</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/10">10: Style</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/11">11: Linting</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/12">12: Database</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/13">13: SVG</a></li>
  </nav>
</details>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents of this branch</summary>
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

If you have not yet visited
[Code Examples to Copy](https://portsoc.github.io/code-copy-examples/)
make sure you write and run (in [Replit](https://replit.com/new/nodejs)) some of its examples from the first 3 stages:

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
