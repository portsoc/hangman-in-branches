<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 4: Events

<!-- Navigation -->
<details>
  <summary>Navigate between branches</summary>  
  <nav class="menu">
    <li><a href="https://github.com/manighahrmani/hangman-in-branches">Intro</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/0">0: Variables</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/1">1: Functions</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/2">2: NPM</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/3">3: DOM</a></li>
    <li>4: Events (this branch)</li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/5">5: Debugging</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/6">6: Canvas</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/7">7: Modularisation</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/8">8: Server Part 1</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/9">9: Server Part 2</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/10">10: Style</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/11">11: Linting</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/12">12: Database</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/13">13: SVG</a></li>
  </nav>
</details>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents of this branch</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#todo">Todo</a></li>
  </ol>
</details>

<a href="https://github.com/portsoc/hangman-in-branches/tree/3" class="previous">&laquo; Previous</a>
<a href="https://github.com/portsoc/hangman-in-branches/tree/5" class="next">Next &raquo;</a>

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

<p align="right">(<a href="#top">back to top</a>)</p>
