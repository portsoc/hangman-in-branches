<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 4: Events

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- 4: Events (current branch)
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

Our app must react to events that happen during the game: The user clicks on the on-screen buttons or uses the keyboard to make a guess.
Additionally, the user may win the game (guess the word) or use up all of their attempts, in which case they should be given the chance to restart the game.

Our goal in this branch is to add event listeners and handlers (functions) that will respond to the user's actions.

If you have not already done so, make sure to check the moodle resources for this topic and attempt the tests [in the event101 repository](https://github.com/portsoc/events101).

## Implementation

To store the game's state, we have the following variables.
Note that they are defined globally (outside of any function) so that they can be accessed by all the functions in `index.js`.

- `word` - the word to be guessed
- `guesses` - the array containing the letters that have been guessed so far
- `el` - the object that will hold the key DOM elements we will need to manipulate
- `lives` - the number of lives remaining
- `onGoing` - a boolean indicating whether the game is still in progress

It is always helpful to visualize the program's flow, to help you write different functions and plan out how they should interact.

Once the page is loaded, `init` is called to set up the game by calling the following functions:

1. `prepareHandles` - selects key DOM elements
1. `startNewGame` - picks a random word and saves it to `word`, populates the `guesses` array with underscores, resets `lives` and turns `onGoing` to `true`
1. `drawKeyboard` - draws the keyboard on the screen
1. `addEventListeners` - adds event listeners to the keyboard buttons and the physical keyboard

This sets up the game for the user but how is the game played?

The user clicks on a button or presses a key on the on-screen keyboard or presses the physical keys.
These events call the following event handlers respectively: `checkClick` and `checkKeyPress`.
Both of the functions pass on the letter that the user has guessed to `registerLetter` for processing.

`registerLetter` contains the main logic of the game.
It takes the letter and passes it to `checkLetter` to see whether it is in `word`.
If it is, it is added to `guesses` and the screen is updated.
Otherwise, `lives` is decremented.

Eventually, one of two things can ultimately happen as the user submits letters:

- `lives` reach 0, in which case the game is lost
- `guesses` contain the entire word (`checkWon` function returns `true` in this case), in which case the game is won

In both of these cases, `onGoing` is set to `false` which stops the event handlers `checkClick` and `checkKeyPress` from registering any more letters.
The user is then forced to reload the page to start a new game.

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
