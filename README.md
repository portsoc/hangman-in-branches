<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 5: Debugging

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

We will be mainly fixing issues and making some of the enhancements left open in the previous branch.

## Implementation

Firstly, to serve the website, we have made client and server folders.
Next, we moved `index.html`, `index.js`, and `images` to the client folder and created the `svr.js` file in the server folder.
`svr.js` at the moment is just a basic express server that serves the client folder.

To install express, we ran the following in the shell (while in the hangman-in-branches folder):

```
npm install express
```

This adds express to the dependencies of the `package.json` file and automatically creates the `package-lock.json` file.
Installing express will also create a `node_modules` folder in the hangman-in-branches.
This contains all the dependencies specific to the computer we are running the program in.
So we have not included `node_modules` in the repository (neither should you include it in your submission).

To see the new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/4...5?diff=split) showing the difference between branches 4 and 5.

## Usage

Open `index.html` in your browser (<kbd>Ctrl</kbd> + <kbd>O</kbd> in Linux/Windows or <kbd>Cmd</kbd> + <kbd>O</kbd> in Mac).

The JavaScript should be already running.
Do you see the keyboard or the dashes for the hangman word?

## Todo

It is a good habit to leave notes reminding yourself of what needs to be done next stage(s) of development.

- [ ] At the moment the user cannot win even if they guess all the letters correctly.

- [ ] Another issue that we have is that the user can guess the same letter multiple times.

- [ ] We have no way of restarting the game other than refreshing the page.

- [ ] We have too many global variables and it is hard to keep track of the game's state.

- [ ] We are not currently serving our game from a server.

- [ ] The image of the hangman game is not updating as the game is being played.

## Further Exploration

Console log the value of `word` before the closing brackets of the `startNewGame` function in `index.js`.
Afterward, save `index.js` and refresh the page in your browser.

Now, inspect the page with <kbd>F12</kbd> or by right-clicking on the page and selecting 'Inspect'.
Can you find the secret word displayed in the console?

It is a good habit to log the value of variables while you are developing a project.

<p align="right">(<a href="#top">back to top</a>)</p>
