<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 6: Canvas and Graphics

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

We will be carrying out minor fixes from the previous branch but mainly we will be focusing on graphics.
More specifically, we will draw the hangman that completes as the user makes wrong guesses.

If you have not done so already, check out the examples in
[the Canvas Stick Figure repository](https://github.com/portsoc/Web-Canvas-Stick-Figures).
Then attempt to complete the exercises in [the canvas repository](https://github.com/portsoc/ws_canvas).

## Implementation

Before we start, we placed the call to `redrawKeyboard` in the correct line in `registerLetter`.
This was left as a challenge in the previous branch, make sure to check it out.
We have also tidied up the comments (notice that you can see our documentation when hovering over the functions).

We being by replacing our placeholder image (in `index.html`) with a canvas element.
In `index.js` we select the canvas and pass it to the functions `drawHangman` alongside the number of lives.

Note that `drawHangman` is an external function (in the new script: `canvas.js`) and is imported into `index.js`.
To import this function, we need to change the `type` attribute of the `script` tag in `index.html` to `module`.
Also, observe that `drawHangman` is the only function that is being exported in `canvas.js`.
The rest of the functions are private helper functions within this script.

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
Check the content of hits and misses to see if they update on time or if the problem is from something else.

<p align="right">(<a href="#top">back to top</a>)</p>
