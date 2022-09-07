<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 0: Variables

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- 0: Variables (current branch)
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

Let's begin by storing the words for the game and then test how we can select them.

## Implementation

We have begun by creating the script `hangman.js` to hold the game's logic.

In there, we have defined an array of strings called `words` which contains movie titles.
We then select the first and last words in the array and log them to the console.

To see the output, follow the instruction in the [usage section](#usage) below.

## Usage

### Using a shell

Navigate to the `hangman-in-branches` folder in a shell and run the following command:

```
node hangman.js
```

This runs the `hangman.js` script, which selects two elements from `words` and prints them back to you.

### Using Visual Studio Code

Open the `hangman-in-branches` folder in Visual Studio Code.
Next, open the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in Linux/Windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in macOS) and type "Create New Terminal" followed by an enter.

![Opening terminal in VSCode](https://i.imgur.com/1J3ip6c.png)

Alternatively, you can use the shortcut <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> in Linux/Windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> in macOS to open a new terminal.

Now copy and paste the following command in the terminal and press enter:

```
node hangman.js
```

<p align="right">(<a href="#top">back to top</a>)</p>
