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
More specifically, we want to move `gameState` and all functions that update it from `client/index.js` to `server/svr.js`.
The main benefit of this action is that we can keep parts of the game's logic private.

So for example, we don't want the client to access parts of the game that we would like to keep secret (e.g., the word to be guessed).
Additionally, the user cannot update the game's state (e.g., they cannot remove elements of the `misses` array).

Not only do we have to move code from client to server, but we also have to update the client so that it sends a request to get resources that the server offers.

If you have not already done so, visit the module resources on the topic and be sure to work your way through the examples and tests of the [fetch101 repository](https://github.com/portsoc/fetch101).
We also recommend you view the [staged-simple-messageboard](https://github.com/portsoc/staged-simple-message-board)[ repository](https://github.com/portsoc/staged-simple-message-board).

## Implementation

### The server stores the game's status and the client only keeps a copy

First, we have copied `gameState` variable from `client/index.js` to `server/svr.js` under the new name `status`.
`status` in `server/svr.js` is pretty much the same as `gameState` except that it now contains the `last` and `won` properties (whether the last guess was correct and if the user has won).

`gameState` now does not contain the `word` property by default.
We only want the client to have access to this property if the game was lost.

We have also renamed `guessed` array to `userWord` to avoid confusion.
The references to `guessed` in `index.js` are updated too.
Remember that these updates and renamings are a natural process of development.

### The server starts a new game and sends a copy the to client

At the start of a new game `gameState`'s properties are reset.
This is now done by `createGame` function in `server/svr.js` which accepts a request and responds with a new `state`.

As a result of this change, we had to move `words`, `randomIndex`, and `randomElement` to the server too.

Back on the client side, because `statrNewGame` is an asynchronous function, we need to use the `async` keyword.
Additionally, we have moved `addEventListeners` at the end of this function so that it gets called once the game is started (and the keyboard is created).

### The server checks a guess and updates the game's status

We started by moving `checkLetter` and `checkWon` to the server (they perform the same job as before).
Some of the functionalities of `registerLetter` that are not related to the frontend have been moved to the server too as described below.

`guessLetter` in the server checks the letter that is passed as a parameter of the request object.
It updates the properties of `status` and returns it as a response.

We should minimize the number of times the client (more specifically `registerLetter`) requests the server to check a letter.
So, for example, we should not send a request if the user's input has been already guessed or if we know that the game is over.

See all of our changes by visiting [this compare page](https://github.com/portsoc/hangman-in-branches/compare/7...8?diff=split).

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

- [ ] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [ ] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [ ] `server/svr.js` should be split into multiple files (we need to modularise the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

## Further Exploration

The Internet Movie Database (IMDb) is a website that provides information about movies.
IMDB provides a public API that returns a list of movies (e.g. top 250 films).
Check out their [API documentation](https://imdb-api.com/api) if you feel up to the challenge of using it as a means of providing a list of movies.

We are not going to implement this in later branches but feel free to show us your solution.
To recap, your goal is to replace the `words` array with the list of movies retrieved from this API.
If you get stuck, take a look at [this example](https://github.com/portsoc/fetch101/blob/master/examples/6_other_peoples_data/script.mjs) from the fetch101 repository.

<p align="right">(<a href="#top">back to top</a>)</p>
