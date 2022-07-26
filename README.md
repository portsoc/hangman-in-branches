<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 6: Canvas and Graphics

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

To serve the website, we need to distinguish between what resources are for the server and what is for the client.
So we have made a client folder that includes:

```
client/
├── images
│   └── hangman.png
├── index.html
└── index.js
```

And a server folder that just includes a script for a basic Express server:

```
server/
└── svr.js
```

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

Now by running `npm start` in the shell, we can see our site being served in our machine over on port 8080 (http://localhost:8080).
To stop the site, we can use <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

### Fix: Non-alphabetical symbols

We start by using a regular expression to pick all the alphabetical characters in the word, replacing them with '\_'.
For more information read our comments in `startNewGame`.

Multiple spaces in HTML are rendered as a single space in the browser.
There are simple ways around it (e.g., using '\&nbsp;') but instead, the `redrawWord` function places each letter in a span element.
This decision will later allow us to treat letters individually (e.g., styling them differently).

### Fix: Repeat guesses

To prevent the user from guessing the same letter twice, we have created `hits` and `misses` arrays.
We could have done it in one array but we would like to distinguish between them when it comes to styling the letters.

`registerLetter` now checks whether the new guess is in the `hits` or `misses` array and displays a message accordingly.
Every time the user makes a new guess, we call `redrawKeyboard` to update the keyboard accordingly.

### Fix: Restart the game

At the end of a game, we call `generateNewGame` function which will remove the keyboard and display a restart button.
When the user clicks the restart button, we call `startNewGame` to start a new game (resets the number of lives, chooses a new word and so on).
Consequently, `startNewGame` now calls `drawKeyboard` to create a new keyboard every time.

To see the new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/4...5?diff=split) showing the difference between branches 4 and 5.

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
The tasks that are left to do are going to be addressed in later branches:

- [x] At the moment the user cannot win even if they guess all the letters correctly.

- [x] Another issue that we have is that the user can guess the same letter multiple times.

- [x] We have no way of restarting the game other than refreshing the page.

- [ ] We have too many global variables and it is hard to keep track of the game's state.

- [x] We are not currently serving our game from a server.

- [ ] The image of the hangman game is not updating as the game is being played.

## Further Exploration

The keys on the on-screen keyboard are not updating on time.
The user has to make a new guess for the previous letter to be registered and reflected on the keyboard.
Use what you have learned in the lessons to fix this issue.

**Hint:** Use your browser's developer tools and set breakpoints within the source code.
Check the content of hits and misses to see if they update on time or if the problem is from something else.

<p align="right">(<a href="#top">back to top</a>)</p>
