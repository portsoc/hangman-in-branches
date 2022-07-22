<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 5: Debugging

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

We will be mainly fixing issues and making some of the enhancements left open in the previous branch.

## Implementation

### Serve the website

Firstly, to serve the website, we have made client and server folders.
We moved `index.html`, `index.js`, and `images` to the client folder and created the `svr.js` in the server folder.
`svr.js` at the moment is just a basic Express server that serves the client folder.

To install Express, we ran the following in the shell (while in the hangman-in-branches folder):

```
npm install express
```

This adds Express to the dependencies of the `package.json` file and automatically creates the `package-lock.json` file.
Installing Express will also create a `node_modules` folder in the hangman-in-branches.
This contains all the dependencies specific to the computer we are running the program in.
So we have not included `node_modules` in the repository.

Inside `package.json` we have added a `start` script and added the attribute `type` set to `module`.
This lets us use import statements (for more info check out [this documentation page](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)).
Now by running `npm start` in the shell, we can see our site being served on port 8080 (http://localhost:8080).

### Fix: Non-alphabetical symbols

We start by using a regular expression to pick all the alphabetical characters in the word, replacing them with '\_'.
For more information read our comments in `startNewGame`.

Multiple spaces in HTML are rendered as a single space in the browser.
There are simple ways around it (e.g., using '\&nbsp;') but we have decided to place each letter in a span element.
This decision will later allow us to treat letters individually (e.g., styling them differently).
The newly created function `redrawWord` takes care of this job.

### Fix: Repeat guesses

To be able to prevent the user from guessing the same letter twice, we have created `hits` and `misses` arrays.
We could have done it in one array but we would like to distinguish between them when it comes to styling the letters.

`registerLetter` now checks whether the new guess is in the `hits` or `misses` array and displays a message accordingly.
Every time the user makes a new guess, we call `redrawKeyboard` to update the keyboard accordingly.

To see the new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/4...5?diff=split) showing the difference between branches 4 and 5.

### Fix: Restart the game

At the end of a game, we call `generateNewGame` function which will remove the keyboard and display a restart button.
When the user clicks the restart button, we call `startNewGame` to start a new game.
Consequently, `startNewGame` now calls `drawKeyboard` to create a new keyboard every time.

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

## Todo

It is a good habit to leave notes reminding yourself of what needs to be done next stage(s) of development.

- [x] At the moment the user cannot win even if they guess all the letters correctly.

- [ ] We have no way of restarting the game other than refreshing the page.

- [x] We are not currently serving our game from a server.

## Todo for later

- [ ] The image of the hangman game is not updating as the game is being played.

- [ ] The user cannot guess the same letter again but the keyboard is not updating on time.

- [ ] We have too many global variables and it is hard to keep track of the game's state.
      Lives can also be calculated from misses.

## Further Exploration

The keys on the on-screen keyboard are not updating on time.
The user has to make a new guess for the previous letter to be registered and reflected on the keyboard.
Use what you have learned in the lessons to fix this issue.

**Hint:** Use your browser's developer tools and set breakpoints within the source code.
Check the content of hits and misses to see if they update on time or if the problem is from something else.

<p align="right">(<a href="#top">back to top</a>)</p>
