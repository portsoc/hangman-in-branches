<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 1: Functions

## Objectives

Instead of manually selecting elements from our `words` array, let's pick them out randomly.

We first need to select a random index of our array.
Then we can use that index to select the element from our array.

We will be grouping lines of code for each task into functions and then calling our functions to get our results.

## Implementation

We start by writing the `randomIndex` function to select a random index of an array given its length.

Next, we will use `randomIndex` within a new function: `randomElement`.
This function will take an array and return a random element from it.

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
