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

We as the developer can decide what a score is and how it is calculated.
So let's define the score with the following formula:

```js
score = (1 / (1 + misses.length)) * 1000;
```

If we choose to expand our game by introducing a countdown or a difficult level, we can update the formula later.
But let's keep it simple for now.

We need to think about where we add the functionality to calculate a score, client-side or server-side.
Since we want to allow multiple games to run concurrently and perhaps create a leaderboard, we need access to the scores on the server.
Of course, we don't want the client to calculate their score as well (it would be redundant) and nor do we want them to put their scores on the server (which allows them to cheat).
So we should add the score calculation to `server/svr.js`.

`calculateScore` in the server now responds with the score if the game is won.
`getScore` in `client/index.js` requests the score from the server and is used by the `feedback` function to display the score.

### Hosting multiple games

We need to store a collection of games on the server (each game has its `status` variable).
But to be able to distinguish between every game, we need to add a unique identifier to each game.
For this reason, we are going to be using [the `uuid` npm package](https://www.npmjs.com/package/uuid).

Following the instructions in the "Quickstart" section of the NPM page, we can install the `uuid` package with:

```bash
npm install uuid
```

We then import it to our server and use it to create unique IDs for each game in the `gamesInPlay` array.
`createGame` now adds the status to `gamesInPlay` and returns the unique ID to the client.
`guessLetter` also requires a unique ID to identify the game in addition to the letter that the player has guessed.
Notice the change in the route for guessing a letter too.

### Modularising the server

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

<p align="right">(<a href="#top">back to top</a>)</p>
