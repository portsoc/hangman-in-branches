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

Our goal in this branch is to add event listeners and handlers (functions) that will respond to the user's actions.

If you have not already done so, make sure to check the moodle resources for this topic and attempt the tests [in the event101 repository](https://github.com/portsoc/events101).

## Implementation

The `init` function first selects key DOM elements that will be used by our functions and adds them as properties of the global `el` object.
It will also call `startNewGame` function which selects a new word to be guessed and resets the number of lives the user has.

Each on-screen key has a `data-letter` attribute that contains the letter that it represents.
Similarly, the press of every physical key on the keyboard triggers an event that has a code that corresponds to the key that was pressed.
Therefore, in the `addEventListeners` function called within `init`, we attach event listeners to the on-screen and physical keys that call the `registerLetter` function.

`registerLetter` will in turn call the `checkLetter` function if the game has not been won or lost.
`checkLetter` decides if the letter is in the word and updates the guessed array if necessary.
`registerLetter` will also update the `instruct` and `feedback` sections of the page accordingly and end the game if necessary.

To see our new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/3...4?diff=split) showing the difference between branches 3 and 4.

## Usage

Open `index.html` in your browser (<kbd>Ctrl</kbd> + <kbd>O</kbd> in Linux/Windows or <kbd>Cmd</kbd> + <kbd>O</kbd> in Mac).

Remember to open the inspector in your browser and view the console.
The shortcut is usually <kbd>F12</kbd> alternatively, right-click on the page and select 'Inspect' from Developer Tools.

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
