<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 8: Fetch & web servers

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

Our aim in this branch is to move some of the resources (functions and variables) from our `client` folder to the `server` one.

For example, the clinet does not need to know the word to be guessed during the game.
Instead, they should send requests to the server with a guess and the server handle the guess and update the state of the game.

If you have not already done so, visit the module resources on the topic and be sure to work your way through the examples and tests of the [fetch101 repository](https://github.com/portsoc/fetch101).
We also recommend you view the [staged-simple-messageboard](https://github.com/portsoc/staged-simple-message-board)[ repository](https://github.com/portsoc/staged-simple-message-board).

## Implementation

We are moving the following functionalities (and all that they depend on) from `client/index.js` to `server/svr.js`:

### Starting a new game

The task of populating the `gameState` variable has now been moved from `client/index.js` to the `createGame` function in `server/svr.js`.
This means we had to move `words`, `randomIndex`, and `randomElement` to the server too.

`gameState` is stored as `status` in `server/svr.js` and has remained pretty much the same except that it now contains the `last` property (whether the last guess was correct).
We have also renamed `guessed` array to `userWord` to avoid confusion.
The references to `guessed` in `index.js` are updated too.

`createGame` responds with a sanitized version of the `status` (which does not contain the word to be guessed by the client).

Since `statrNewGame` is an asynchronous function, we need to use the `async` keyword.
Additionally, we have moved `addEventListeners` at the end of this function so that it gets called once the game is started (and the keyboard is created).

### Checking a guess

First, we have moved `checkLetter` and `checkWon` to the server (they perform the same job as before).
Some of the functionalities of `registerLetter` that are not related to the frontend have been moved to the server too as described below.

`guessLetter` in the server checks the letter that is passed as a parameter of the request object.
It updates the properties of `status` and returns the sanitized version of it if the game is not finished (otherwise it returns `status` as is).

We should minimize the number of times the client requests the server to check a letter.
So, for example, we should check, on client side, if user's input has been already guessed and if so, we can skip the server request.

To see the new changes, head to [this compare page](https://github.com/portsoc/hangman-in-branches/compare/7...8?diff=split).

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

We have met all of the goals we have set previously.
So it is time to set out new goals for ourselves.
See the <a href="#further-exploration">further exploration</a>.

- [] Task 1

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
