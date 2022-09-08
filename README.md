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

You can do this in Visual Studio Code in any of the following methods:

- (a) Click on the `New folder` icon in the Explorer tab
- (b) Open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> Linux/Windows and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in macOS) then type `New folder` followed by <kbd>Enter</kbd>

![New folder in Visual Studio Code
](https://i.imgur.com/CCKm9Ce.png)

We have moved everything that needs to be served to the client to the `client` folder so that this folder now contains the following files:

```
client/
├── images
│   └── hangman.png
├── index.html
└── index.js
```

Our `server` folder only contains a new file called `svr.js` which will be our server.

```
server/
└── svr.js
```

Before we start writing our server, we need to install the Express package.
Open the [page for the Express package](https://www.npmjs.com/package/express) and look for its installation guide.

To install a package for our `hangman-in-branches` project, we either have to navigate to this folder using a shell and then run the following command:

```
npm install express
```

Alternatively, we can open a terminal in Visual Studio Code and run the same command:

![Installing Express in Visual Studio Code](https://i.imgur.com/pNZqSQh.png)

This adds Express to the dependencies attribute of our `package.json` file and automatically creates the `package-lock.json` file.
For more info on what these files do check out [this page on `package.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) and [this page on `package-lock.json`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

Installing Express will also create a `node_modules` folder in the hangman-in-branches.
This contains all the dependencies specific to the computer we are running the program in.
For this reason, we have not included `node_modules` in the repository (look for this in the `.gitignore` file).

Something else that happens once you install a package is that the dependencies will be added to the `package.json` file.
Take a look at this file and observe what is added to the "dependencies" attribute.
As discussed in [the usage section](#usage), once you clone the repository and checkout this branch, you will need to run `npm install` which installs the dependencies.

The first thing that we need to add to `package.json` is the attribute `type` set to `module`.
This lets us use import statements (for more info check out [this documentation page](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)).

Another change we have made to `package.json` is that we have replaced the `test` script (that we were not using) with a new `start` script.
It is a convention to set the `start` script to the shell command that starts the server:

```json
"scripts": {
  "start": "node server/svr.js"
}
```

Now we can navigate to `hangman-in-branches` folder with the shell and run `npm start` to start the server.
Alternatively, if you are using Visual Studio Code, find the `start` script in the "NPM Scripts" section of the `Explorer` tab and click on it to start the server.

![NPM Scripts in Visual Studio Code](https://i.imgur.com/H1PxFsR.png)

Our server logs a message to the terminal telling us that our site is being served in our machine over port 8080.
Open your browser and navigate to http://localhost:8080 to see the website.

To stop the server, click on the terminal and hit <kbd>Ctrl</kbd> + <kbd>C</kbd>.

### Fix issues

#### User cannot win

If you try to play the game, you will notice that you cannot win because the game does not allow you to enter the spaces in the word.

This is because we expect the user to guess every character in `word` as we have replaced everything (alphabetic or otherwise) with an underscore in the `startNewGame` function.
However, `checkClick` and `checkKeyPress` only register alphabetic characters as valid guesses.

To fix this issue, we are using a regular expression to pick only the alphabetical characters in the word and replace them with '\_'.
For more information, read our comments in `startNewGame`.

This however creates another issue.
In HTML, multiple spaces are rendered as a single space in the browser.
For example, if we have the following HTML:

```html
<p>h e l l o w o r l d</p>
```

The browser will render it as:

```
h e l l o w o r l d
```

So instead of joining the elements of `guessed` array and displaying it in the `instruct` section, we are also using the `redrawWord` function to place each letter in a span element.

#### User can guess the same letter multiple times

To be able to prevent this behavior, we need to store the letters that the user has guessed.
We have now created `hits` and `misses` arrays.
This could have been done with one array but we would like to distinguish between them when it comes to styling the letters.

`registerLetter` now checks whether the new guess is in the `hits` or `misses` array.
If this was the case, instead of checking the guess, it displays a message to the user in `feedback` section.
Otherwise, `registerLetter` checks the new guess and calls `redrawKeyboard` to update the keyboard, deactivating the letter that was guessed.

#### User has no way of restarting the game

In `registerLetter`, once the game is over (`lives` reaches 0 or `checkWon` returns `true`) we call `generateNewGame` function which will remove the keyboard and display a restart button.
We have added an event listener to this button which calls `startNewGame` to start a new game when the user clicks on it.

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
