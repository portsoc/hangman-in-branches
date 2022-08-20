<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 9: Server Part 2

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

Aside from minor improvements, we are aiming to close the following tasks opened in the to-do list of [the previous branch](https://github.com/portsoc/hangman-in-branches/tree/8):

- Calculating and displaying a score
- Hosting multiple games
- Modularising the server

## Implementation

### Calculating and displaying a score

We as developers can decide what a score is and how it is calculated.
So let's define the score with the following formula:

```js
score = (1 / (1 + misses.length)) * 1000;
```

If we choose to expand our game by introducing a countdown or a difficulty, we can update the formula later.
But let's keep it simple for now.

We need to think about where we add the functionality to calculate a score, client-side or server-side.
Since we want to allow multiple games to run concurrently and perhaps create a leaderboard, we need access to the scores on the server (where the games are stored).
Of course, we don't want the client to calculate their score as well (it would be redundant) and nor do we want them to put their scores on the server (which allows them to cheat).
This concludes that we should add the score calculation to the server.

`calculateScore` in the server now responds with the score if the game is won.
`getScore` in `client/index.js` requests the score from the server and is used by the `registerLetter` function to display the score.

### Hosting multiple games

We need to store a collection of games on the server (each game has its `status` variable).
But to be able to distinguish between every game, we need to add a unique identifier to each game.
For this reason, we are going to be using [the `uuid` npm package](https://www.npmjs.com/package/uuid).

Following the instructions in the "Quickstart" section of the NPM page, we can install the `uuid` package with:

```bash
npm install uuid
```

We then import it to our server and use it (by calling `uuidv4()`) to create unique IDs for each game in the `gamesInPlay` array.

`createGame` now creates a new game in `gamesInPlay` and returns it (with its unique ID) to the client.
`guessLetter` also requires a unique ID to identify the game in addition to the letter that the player has guessed.
Notice the change in the url for guessing a letter too (see `sendGuess`).

### Modularising the server

`server/svr.js` at this point is very large and contains, data, a lot of functionality as well as helper functions.
We need to separate the game's logic from the server and place it in a new module called `server/game.js`.
We then take the static data (`words` array) and place it in `server/data.js` and similarly moved the helper functions to `server/helpers.js`.
By the end, the `server/svr.js` is just handling requests and calling `server/game.js` to generate responses.
`server/game.js` in turn takes its data from `server/data.js` and uses `server/helpers.js` to handle the game's logic.

See all of our changes by visiting [this compare page](https://github.com/portsoc/hangman-in-branches/compare/8...9?diff=split).

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

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularise the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [ ] As we have almost met all of the core requirements, we can start with the style of our website.

- [ ] We should lint our code, checking its quality, before submission (although this could have been done earlier too).

## Further Exploration

Our multiplayer game may not make much sense at the moment since we are serving it on localhost.
You can still access the game from different browsers but you will have to host your game to be able to access it on the internet from different devices.

Try hosting this game to learn how to do the same with your submissions.
Remember that you need to have the code for your submission on a private GitHub repository.
Once you have done this, follow the instructions in [this document](https://docs.google.com/document/d/1zqvC5jOoXQlXggKZkEC025H-N6k7HxdTHpsy0Iylt0c/edit?usp=sharing).
Remember to make a `web` folder in your [virtual machines](https://uop-1-server-per-student-devel.appspot.com/) before cloning the repository into it.
Serve it and try to access the site from different devices.

We will also leave you with another challenge that you can try to solve.
At the moment, we have no way of deleting a game from the server.
The client requests for the creation of a `status` object which stays in the `gamesInPlay` for as long as the server is running.
Regardless of whether the game is finished or not, the `status` should be deleted from `gamesInPlay` after a set amount of time.

Begin by creating a global constant `TIMEOUT` as shown below (decide whether this should be part of `svr.js` or `game.js`):

```js
const TIMEOUT = 1000 * 60 * 10; // 10 mins
```

We want every `status` object to have a `timeout` property depending on which, we can decide to delete it from `gamesInPlay`.
This property should be updated every time the game is created or played.
So create a `keepGameAlive` function as shown below and call it from `createGame` and `guessLetter`:

```js
function keepGameAlive(id) {
  if (gamesInPlay[id]) {
    gamesInPlay[id].timeout = new Date().getTime() + TIMEOUT;
  }
}
```

Ultimately use the [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) to regularly call a function like `deleteOldGames` to delete old games:

```js
function deleteOldGames() {
  const now = new Date().getTime();
  for (const id in gamesInPlay) {
    if (gamesInPlay[id].timeout < now) {
      delete gamesInPlay[id];
    }
  }
}
```

Remember that you should return appropriate responses to the client when their requests' are about old/expired games.
Once you have a working solution, make sure to test it and feel free to show it to us in the class.

<p align="right">(<a href="#top">back to top</a>)</p>
