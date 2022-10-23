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

If you have not yet visited
[Code Examples to Copy](https://portsoc.github.io/code-copy-examples/)
make sure to copy and run some of the examples from the first 3 branches.
You can do this either in an editor or in [Replit (in your browser)](https://replit.com/new/nodejs):

- [Stage 1](https://portsoc.github.io/code-copy-examples)
- [Stage 2](https://portsoc.github.io/code-copy-examples/stage-2)
- [Stage 3](https://portsoc.github.io/code-copy-examples/stage-3)

## Implementation

We have begun by creating the script `hangman.js` to hold the game's logic.

Once you have a folder opened in Visual Studio Code, you can create a new file in that directory in either of two ways:

- (a) Click on the 'new file' icon in the explorer pane (left-hand side of the screen).
- (b) Open command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in Linux/Windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in macOS) and type in "new file" followed by <kbd>Enter</kbd>.

Afterward, type in the name of the file you want to create and press <kbd>Enter</kbd>.
Remember to include the file extension (".js" in our case).

![New file in Visual Studio Code](https://i.imgur.com/n2zVcMU.png)

In the newly created file, we have defined an array of strings called `words` that contains movie titles.

```js
const words = [
    'Jurassic Park', 'Star Wars', 'The Matrix',
    'The Godfather', 'The Dark Knight', 'The Lord of the Rings',
    'The Lord of the Rings', 'The Dark Knight', 'Pulp Fiction',
];
```

We then select the second and last words in the array by specifying an index.
Ultimately we log them to the console alongside some text.

Here is a more compact way of writing the same code:

```js
// outputs the second element, at index 1 (indices start at 0)
console.log(words[1]);

const numberOfWords = words.length;
// outputs the last element, at index numberOfWords - 1
console.log(words[numberOfWords - 1]);
```

Can we do better? Try to do the same job in 2 lines of code.

To run the code and see the output, follow the instruction in the [usage section](#usage) below.

## Usage

You can follow the instructions below to run the code in this branch:

### Option 1: Using a shell

Open a terminal or command prompt and navigate to the project's root directory.
Once in `hangman-in-branches` folder, run the following command:

```
node hangman.js
```

This runs the `hangman.js` script, which selects two elements from `words` and prints them back to you.

### Option 2: Using Visual Studio Code

0. Open the `hangman-in-branches` folder in Visual Studio Code.
0. Use the command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in Linux/Windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> in macOS) and type in "create new terminal" followed by an <kbd>Enter</kbd>.
0. In the terminal, type in `node hangman.js` and press <kbd>Enter</kbd>.

![Using terminal in Visual Studio Code](https://i.imgur.com/Dhng76K.png)

Alternatively, you can use the shortcut <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> in Linux/Windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> in macOS to open a new terminal.

You should see the output (the second and the last word in the `words` array) in the terminal.

<p align="right">(<a href="#top">back to top</a>)</p>
