<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 8: Server Part 1

- [Intro](https://github.com/portsoc/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- [5: Debugging](https://github.com/portsoc/hangman-in-branches/tree/5)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- 8: Server Part 1 (current branch)
- [9: Server Part 2](https://github.com/portsoc/hangman-in-branches/tree/9)
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

Our aim in this branch is to move some of the resources (functions and variables) from our `client` folder to the `server` one.
More specifically, we want to move `gameState` and all functions that update it from `client/index.js` to `server/svr.js`.

So for example, we don't want the client to read parts of the game that we would like to keep secret (e.g., the word to be guessed).
Additionally, we don't want the user to update the game's state (e.g., they should not be able to remove elements of the `misses` array).

Our app would be useless if everything is hidden from the client.
So we are also going to update the client so that it sends a request to get resources that the server offers.

If you have not already done so, visit the module resources on the topic and be sure to work your way through the examples and tests of the [fetch101 repository](https://github.com/portsoc/fetch101).
We also recommend you view the [staged-simple-messageboard](https://github.com/portsoc/staged-simple-message-board)[ repository](https://github.com/portsoc/staged-simple-message-board).

## Implementation

### Only server stores game

First, we have copied `gameState` variable from `client/index.js` to `server/svr.js` under the new name `status`.
`status` in `server/svr.js` is pretty much the same as `gameState` except that it now contains the `last` and `won` properties (whether the last guess was correct and if the user has won).

`gameState` still contains `word` but we do not send it to the client if the game is not over (see how `sanitizedStatus` is used as part of `createGame`).

We have also renamed `guessed` array to `userWord` to avoid confusion.
The references to `guessed` in `index.js` are updated too.
Remember that these updates and renamings are a natural process of development.

### Server sends game to client on new game

At the start of a new game `gameState`'s properties are reset.
This is now done by `createGame` function in `server/svr.js` which accepts a request and responds with a new `status`.

As a result of this change, we had to move `words`, `randomIndex`, and `randomElement` to the server too.

Back on the client side, because `statrNewGame` is an asynchronous function, we need to use the `async` keyword.

### Server checks guess and updates game

We started by moving `checkLetter` and `checkWon` to the server (they perform the same job as before).
Some of the functionalities of `registerLetter` that are not related to the front end have been moved to the server too as described below.

`guessLetter` in the server checks the letter that is passed as a parameter of the request object.
It updates the properties of `status` and returns it as a response.

We should minimize the number of times the client requests the server to check a letter.
So, for example, `registerLetter` does not send a request if the user's input has been already guessed or if we know that the game is over.

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

Our to-do list at the moment is focusing mainly on the implementation of the server. We will later add more features to the client (e.g., CSS):

- [ ] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [ ] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [ ] `server/svr.js` should be split into multiple files (we need to modularise the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

## Further Exploration

The Internet Movie Database (IMDb) is a website that provides information about movies.
They provide a public API that returns a list of movies (e.g. top 250 films).
Check out their [API documentation](https://imdb-api.com/api) if you feel up to the challenge of using it as a means of providing a list of movies.

We are not going to implement this in later branches but feel free to show us your solution.
To recap, your goal is to replace the `words` array with the list of movies retrieved from this API.
If you get stuck, take a look at [this example](https://github.com/portsoc/fetch101/blob/master/examples/6_other_peoples_data/script.mjs) from the fetch101 repository.

<p align="right">(<a href="#top">back to top</a>)</p>
