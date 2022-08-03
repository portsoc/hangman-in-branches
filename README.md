<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 7: Modularisation

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#todo">Todo</a></li>
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

## Objectives

You can already see that our program is growing in size and complexity.
Not only do we have rather large functions but the `index.js` script is also way too long.

This makes it harder to debug our code or develop it further.
So in this branch, we will not implement any new features and just spend our time breaking down the existing code into smaller but tightly related modules.

We encourage you to visit the resources on moodle before continuing.
You should already be familiar with the concepts of modularisation and why it increases one's code quality.

## Implementation

### Grouping existing variables

We have grouped our variables `hits`, `misses`, `guessed`, `word` and `onGoing` to in a single `gameState` variable.
They are now all properties of `gameState`.

This will make more sense in the later branches (where `gameState` is fetched from the server).
We have also simplified things by calculating lives from the `misses` array and removing the `lives` variable.

### Extracting repeated code into new functions

First, we have created a `safeRemove` function.
This is because, on multiple occasions, we have used the same two lines of code to remove a DOM element.
So we extracted these lines into a new function, called `safeRemove`, and reused it.

Similarly, we have created the `create` and `feedback` functions.

We can then improve these functions in later branches.
For example, we could improve `feedback` by displaying multiple DOM elements and giving them classes.
The important benefit of our changes is that we only have to update the function's definition, not every place where it was used.

Although our changes do not significantly decrease the volume of code, they help with the readability and maintainability of our code.

| Syntax | Description                                   |
| ------ | --------------------------------------------- |
| Header | Title                                         |
| List   | <ul><li>Item one.</li><li>Item two.</li></ul> |

To see the new changes, head to [this compare page](https://github.com/portsoc/hangman-in-branches/compare/6...7?diff=split).

## Usage

Run the following command to install all the dependencies:

```
npm install
```

Next, run the start script to start the server:

```
npm start
```

The website is now running locally on port 8080 so view it by visiting http://localhost:8080 in your browser.
Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

## Todo

This is our to-do list from the previous branch.
The open tasks are going to be addressed in later branches:

- [x] At the moment the user cannot win even if they guess all the letters correctly.

- [x] Another issue that we have is that the user can guess the same letter multiple times.

- [x] We have no way of restarting the game other than refreshing the page.

- [ ] We have too many global variables and it is hard to keep track of the game's state.

- [x] We are not currently serving our game from a server.

- [x] The image of the hangman game is not updating as the game is being played.

## Further Exploration

The keys on the on-screen keyboard are not updating on time.
The user has to make a new guess for the previous letter to be registered and reflected on the keyboard.
Use what you have learned in the lessons to fix this issue.

**Hint:** Use your browser's developer tools and set breakpoints within the source code.
Check the content of hits and misses to see if they update on time or if the problem is from something else.

<p align="right">(<a href="#top">back to top</a>)</p>
