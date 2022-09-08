<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 5: Debugging

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- 5: Debugging(current branch)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- [8: Server Part 1](https://github.com/portsoc/hangman-in-branches/tree/8)
- [9: Server Part 2](https://github.com/portsoc/hangman-in-branches/tree/9)
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

We will be only focusing on [the issues that we have left open in the previous branch](https://github.com/manighahrmani/hangman-in-branches/blob/4/README.md#todo).

We will start with the biggest one: Serving our game from a server.
Afterward, we will work our way through the rest of the enhancements and bugs that we have left open.

## Implementation

### Serve the website

To serve the website, we need to distinguish between what resources are for the server and what is for the client.
So we have begun by making two folders in our `hangman-in-branches` directory.

You can do this in Visual Studio Code with any of the following methods:

- (a) Click on the `New folder` icon in the Explorer tab
- (b) Open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> Linux/Windows and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in macOS) then type `New folder` followed by <kbd>Enter</kbd>

![New folder in Visual Studio Code
](https://i.imgur.com/CCKm9Ce.png)

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

We have followed the installation guide on the [page for the Express package](https://www.npmjs.com/package/express) to install this as a dependency for our project.
This means that we have first navigated to the `hangman-in-branches` folder in the shell and then run the following command:

```
npm install express
```

This adds Express to the dependencies attribute of our `package.json` file and automatically creates the `package-lock.json` file.
For more info on what these files do check out [this page on `package.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) and [this page on `package-lock.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

Installing Express will also create a `node_modules` folder in the hangman-in-branches.
This contains all the dependencies specific to the computer we are running the program in.
For this reason, we have not included `node_modules` in the repository (look for this in the `.gitignore` file).

Something else that happens once you install a package is that the dependencies will be added to the `package.json` file.
Take a look at this file and observe what is added to "dependencies" attribute.
As discussed in [the usage section](#usage), once you clone the repository and checkout this branch, you will need to run `npm install` which installs the dependencies.

Inside `package.json` we have manually added a `start` script as shown below.
It is a convention to set the `start` script to the shell command that starts the server:

```json
"scripts": {
  "start": "node server/svr.js"
}
```

Now by running `npm start` in the shell, we can see our site is being served in our machine over port 8080 (http://localhost:8080).
To stop the site, we can use <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

The last thing that we have added to `package.json` is the attribute `type` set to `module`.
This lets us use import statements (for more info check out [this documentation page](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)).

### Fix issues

#### Non alphabetical symbols

We start by using a regular expression to pick all the alphabetical characters in the word, replacing them with '\_'.
For more information read our comments in `startNewGame`.

Multiple spaces in HTML are rendered as a single space in the browser.
There are simple ways around it (e.g., using '\&nbsp;') but instead, the `redrawWord` function places each letter in a span element.
This decision will later allow us to treat letters individually (e.g., styling them differently).

#### Repeat guesses

To prevent the user from guessing the same letter twice, we have created `hits` and `misses` arrays.
We could have done it in one array but we would like to distinguish between them when it comes to styling the letters.

`registerLetter` now checks whether the new guess is in the `hits` or `misses` array and displays a message accordingly.
Every time the user makes a new guess, we call `redrawKeyboard` to update the keyboard accordingly.

#### Restart game

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
For more information, visit the documentation page on [breakpoints in Chrome](https://developer.chrome.com/docs/devtools/javascript/breakpoints/).
Check the content of hits and misses to see if they update on time or if the problem is from something else.

<p align="right">(<a href="#top">back to top</a>)</p>
