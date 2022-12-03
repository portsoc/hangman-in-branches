<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 9: Server Part 2

- [Intro](https://github.com/portsoc/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- [5: Debugging](https://github.com/portsoc/hangman-in-branches/tree/5)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- [8: Server Part 1](https://github.com/portsoc/hangman-in-branches/tree/8)
- 9: Server Part 2 (current branch)
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

Aside from minor improvements, we are aiming to close the following tasks opened in the to-do list of [the previous branch](https://github.com/portsoc/hangman-in-branches/tree/8#todo):

- Calculating and displaying a score
- Hosting multiple games
- Modularising the server

## Implementation

### Calculating and displaying score

We as developers can decide what a score is and how it is calculated.
So let's define the score with the following formula:

```js
score = (1 / (1 + misses.length)) * 1000;
```

If we choose to expand our game by introducing a countdown or a difficulty, we can update the formula later.
But let's keep it simple for now.

We need to think about where we add the functionality to calculate a score, client-side or server-side.
Since we want to allow multiple games to run concurrently and perhaps create a leaderboard, we need access to the scores on the server (where the games are stored).
Of course, we don't want the client to calculate their score as well and nor do we want them to put their scores on the server (which allows them to cheat).
This concludes that we should add the score calculation to the server.

`calculateScore` in the server now responds with the score if the game is won.
`getScore` in `client/index.js` requests the score from the server and is used by the `registerLetter` function to display the score.

### Hosting multiple games

We need to store a collection of games on the server (each game has its `status` variable).
But to be able to distinguish between every game, we need to add a unique identifier to each game.
For this reason, we are going to be using [the `uuid` NPM package](https://www.npmjs.com/package/uuid).

Following the instructions in the "Quickstart" section of `uuid`'s page, we have installed this package with:

```bash
npm install uuid
```

Recall that this will add the `uuid` package as a new dependency to the `package.json` file and install it in the `node_modules` folder.

We then import it to our server and use it by calling the `uuidv4` function to create unique IDs for each game in the `gamesInPlay` array.

`createGame` now creates a new game in `gamesInPlay` and returns it (with its unique ID) to the client.
`guessLetter` also requires a unique ID to identify the game in addition to the letter that the player has guessed.

Notice the change in the URL for guessing a letter too (see `sendGuess`).
Open the "Network" tab in the browser's developer tools to see the requests URL.
Here is an example of a request to guess the letter `t` in the game with the ID `ba4da002-665b-406a-b1ca-90ac5f321941`:

```bash
http://localhost:8080/games/ba4da002-665b-406a-b1ca-90ac5f321941/t
```

### Modularising server

`server/svr.js` at this point is very large and contains, data, a lot of functionality as well as helper functions.
We need to separate the game's logic from the server and place it in a new module called `server/game.js`.
We then take the static data (`words` array) and place it in `server/data.js`.
By the way, we have added a lot more movie titles to this array.

Similarly, we moved the helper functions to `server/helper.js`.
By the end, the `server/svr.js` is just handling requests and calling the appropriate function in `server/game.js` to generate responses.
`server/game.js` in turn takes its data from `server/data.js` and uses `server/helper.js` to handle the game's logic.

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

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularize the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [ ] As we have almost met all the core requirements, we can start with the style of our website.

- [ ] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

### Run this app on a web server

Our multiplayer game may not make much sense at the moment since we are serving it on localhost (to only one client).
You can still play multiple games from different browsers but you will have to host your game to be able to access it on the internet from different devices.

Your challenge is to host this game.
This will teach you to do the same with your submissions or future projects.

Let's start by showing you how to serve an app with your student VMs.
Visit your [MyVm page](http://port.ac.uk/myvm) and start it up.
You can then SSH into your VM using the credentials provided on the page or just use [the Secure Shell extension](https://chrome.google.com/webstore/detail/secure-shell/iodihamcpbpeioajjeobimgagajmlibd?hl=en) to launch a connection in your browser.

If you would like to host your app, make sure it is in a private git repository.
Check [this guide](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories), if you have any authentication errors while cloning your repository into your VM.
Alternatively, you can clone this public repository as practice.

Run the following command to change the directory to the `web` folder and clone our repository within it:

```bash
cd web && git clone https://github.com/portsoc/hangman-in-branches.git
```

Next, change the directory to the `hangman-in-branches` folder and checkout branch `9`:

```bash
cd hangman-in-branches && git checkout 9
```

Serve your site (following the instructions in the [usage section](#usage)).
Once the server has started, you could access it by visiting the IP address shown on the MyVM page or [upABCDEF.myvm.port.ac.uk](upABCDEF.myvm.port.ac.uk) where ABCDEF is replaced by your student number.
You may also need to specify the port by adding the port number to the end of the URL (e.g., [upABCDEF.myvm.port.ac.uk:8080](upABCDEF.myvm.port.ac.uk:8080)).
If you cannot access it, try adding the port number, `8080`, to the end of the URL.

For more information on how to use your VM, we suggest checking out [this document](https://docs.google.com/document/d/1zqvC5jOoXQlXggKZkEC025H-N6k7HxdTHpsy0Iylt0c/edit).
Make sure to read the section titled "If you want to run a Web server" if you are having any issues with hosting your site.

We will also leave you with another challenge that you can try to solve.

### Delete old games

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

Remember that you should return appropriate responses to the client when their requests are about non-existing games.
Once you have a working solution, make sure to test it and feel free to show it to us in the class.

<p align="right">(<a href="#top">back to top</a>)</p>
