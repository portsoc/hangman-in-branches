<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 4: Events

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

The site must react to events that happen during the game: The user clicks on the on-screen buttons or uses the keyboard to make a guess.

Additionally, the user may either guess the word or use up all of their attempts in which case they should be given the chance to restart the game.

Our goal in this branch is to add event listeners and event handlers (functions) that will respond to the user's actions.

## Implementation

We have created a simple HTML page titled `index.html`.

`index.html` begins with defining standard metadata for the page, such as the title, character set, and viewport.

`index.html` also contains sections for the following:

- **Noose**: The image/canvas of the hangman. At the moment, it contains a placeholder image.
- **Instructions**: It currently contains a row of dashes representing letters to be guessed.
- **Feedback**: Hints and messages to the player.
- **Keyboard**: An on-screen keyboard.

Additionally, we have renamed `hangman.js` to `index.js` (a more conventional name) and linked it to `index.html`.

At the end of `index.js`, we have defined a function `init` that is called once the window has loaded.

`init` calls two functions: `drawKeyboard`, which creates a set of buttons making an on-screen keyboard.
And `startNewGame`, which at the moment inserts a random word as the content of the instruct section.

If any of the script is confusing, checkout the examples in [DOM101 repository](https://github.com/portsoc/dom101) and attempt the tasks in that repo.

To see our new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/2...3?diff=split) showing the difference between branches 2 and 3.

## Usage

Open `index.html` in your browser (<kbd>Ctrl</kbd> + <kbd>O</kbd> in Linux/Windows or <kbd>Cmd</kbd> + <kbd>O</kbd> in Mac).

The JavaScript should be already running.
Do you see the keyboard or the dashes for the hangman word?

## Todo

The user is only expected to guess alphabetical characters (not the symbols or punctuation within the word).
Therefore we should only hide alphabetical characters from the user and display the rest.

## Further Exploration

Console log the value of `word` before the closing brackets of the `startNewGame` function in `index.js`.
Afterwards, save `index.js` and refresh the page in your browser.

Now, inspect the page wih <kbd>F12</kbd> or by right-clicking on the page and selecting 'Inspect'.
Can you find the secret word displayed in the console?

It is a good habit to log the value of variables while you are developing a project.

<p align="right">(<a href="#top">back to top</a>)</p>
