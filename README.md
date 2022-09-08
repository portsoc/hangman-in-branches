<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 6: Canvas

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- [5: Debugging](https://github.com/portsoc/hangman-in-branches/tree/5)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- [8: Server Part 1](https://github.com/portsoc/hangman-in-branches/tree/8)
- [9: Server Part 2](https://github.com/portsoc/hangman-in-branches/tree/9)
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

We will be carrying out minor fixes from the previous branch but mainly we will be focusing on graphics.
More specifically, we will draw the hangman that completes as the user makes wrong guesses.

If you have not done so already, check out the examples in
[the Canvas Stick Figure repository](https://github.com/portsoc/Web-Canvas-Stick-Figures).
Then attempt to complete the exercises in [the canvas repository](https://github.com/portsoc/ws_canvas).

## Implementation

Before we start, we placed the call to `redrawKeyboard` in the correct line in `registerLetter`.
This was left as [a challenge in the previous branch](https://github.com/manighahrmani/hangman-in-branches/tree/5#further-exploration), make sure to check it out.

We have also tidied up the comments and written them as JSDoc comments (for more info see [this page](https://jsdoc.app/about-getting-started.html)).
You don't need to worry about this, but now you could see our documentation by hovering over the names of documented objects (like functions) in your IDE.
Here is an example of what it looks like in VSCode:

![Hovering over a function for its documentation](https://i.imgur.com/dYvVqWb.png)

We start by replacing our placeholder image (in `index.html`) with a canvas element.
In `index.js` we select the canvas and pass it to the functions `drawHangman` alongside the number of lives.

Note that `drawHangman` is an external function (in the new script: `canvas.js`) and is imported into `index.js`.
To import this function, we need to change the `type` attribute of the `script` tag in `index.html` to `module`.

`drawHangman` is the only function that is being exported in `canvas.js`.
The rest of the functions are private helper functions within this script.
This script has a few good examples of modularisation, a topic that we will cover in the next branch.

To see the new changes, head to [this compare page](https://github.com/portsoc/hangman-in-branches/compare/5...6?diff=split).

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
The open tasks are going to be addressed in later branches:

- [x] At the moment the user cannot win even if they guess all the letters correctly.

- [x] Another issue that we have is that the user can guess the same letter multiple times.

- [x] We have no way of restarting the game other than refreshing the page.

- [ ] We have too many global variables and it is hard to keep track of the game's state.

- [x] We are not currently serving our game from a server.

- [x] The image of the hangman game is not updating as the game is being played.

<p align="right">(<a href="#top">back to top</a>)</p>
