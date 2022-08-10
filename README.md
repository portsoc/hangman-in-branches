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

For example, the client does not need to know the word to be guessed during the game.
Instead, they should send requests to the server with a guess and the server handle the guess and update the state of the game.

If you have not already done so, visit the module resources on the topic and be sure to work your way through the examples and tests of the [fetch101 repository](https://github.com/portsoc/fetch101).
We also recommend you view the [staged-simple-messageboard](https://github.com/portsoc/staged-simple-message-board)[ repository](https://github.com/portsoc/staged-simple-message-board).

## Implementation

We are moving `gameState` and all functions that update it from `client/index.js` to `server/svr.js`.
We are also going to update the client so that it sends a request to get this variable for the first time or update it.

### Starting a new game

At the start of a new game `gameState`'s properties are reset.
First, we have moved `gameState` variable from `client/index.js` to `server/svr.js` under the new name `status`.

Creating a new game is now `createGame` function in `server/svr.js` which accepts a request and responds with a new `state`.
This means we had to move `words`, `randomIndex`, and `randomElement` to the server too.

`status` in `server/svr.js` is pretty much the same as `gameState` except that it now contains the `last` and `won` properties (whether the last guess was correct and if the user has won).
We have also renamed `guessed` array to `userWord` to avoid confusion.
The references to `guessed` in `index.js` are updated too.
Remember that these updates and renamings are a natural process of development.

Back on the client side, because `statrNewGame` is an asynchronous function, we need to use the `async` keyword.
Additionally, we have moved `addEventListeners` at the end of this function so that it gets called once the game is started (and the keyboard is created).

### Checking a guess

First, we have moved `checkLetter` and `checkWon` to the server (they perform the same job as before).
Some of the functionalities of `registerLetter` that are not related to the frontend have been moved to the server too as described below.

`guessLetter` in the server checks the letter that is passed as a parameter of the request object.
It updates the properties of `status` and returns it as a response.

We should minimize the number of times the client (more specifically `registerLetter`) requests the server to check a letter.
So, for example, we should check, on the client side, if the user's input has been already guessed and if so, we can skip the server request.

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

Our to-do list at the moment is focusing mainly on the implementation of the server. We will later add more features to the client (e.g., CSS styling):

- [ ] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously.

- [ ] `server/svr.js` should be split into multiple files (we need to modularise our code serverside too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

## Further Exploration

IMDB provides an API that returns a list of movies (e.g. top 250 films).
Check out their [API documentation](https://imdb-api.com/api) and if you feel up to the challenge, try to implement it as a means to provide a list of movies.

We are not going to implement this in later branches but feel free to show us your solution.
To recap, your goal is to replace the `words` array with the list of movies retrieved from this API.
If you get stuck, take a look at [this example](https://github.com/portsoc/fetch101/blob/master/examples/6_other_peoples_data/script.mjs) from the fetch101 repository.

<p align="right">(<a href="#top">back to top</a>)</p>
