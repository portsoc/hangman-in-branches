<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 3: DOM

<!-- Navigation -->
<details>
  <summary>Navigate between branches</summary>  
  <nav class="menu">
    <li><a href="https://github.com/manighahrmani/hangman-in-branches">Intro</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/0">0: Variables</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/1">1: Functions</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/2">2: NPM</a></li>
    <li>3: DOM (this branch)</li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/4">4: Events</a></li>
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
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

## Objectives

Our website needs a homepage.
So our task here is to create a simple HTML page.

All we care about at this stage is to have placeholders for different components of our game.
Therefore we don't care about the **style of the page**.

We also require our JS script (previously called `hangman.js`) to be linked to the HTML document.
Ideally, we would like the script to perform some forms of basic DOM manipulation too.

Before you start, make sure to check out the moodle resources, especially:
Try the examples in [Code Examples to Copy, stage 5](https://portsoc.github.io/code-copy-examples/stage-5) and attempt the tests in the [dom101 repository](https://github.com/portsoc/dom101).

## Implementation

We have created a simple HTML page titled `index.html`.

`index.html` begins with defining standard metadata for the page, such as the title, character set, and viewport.

`index.html` also contains sections for the following:

- `#noose`: The image/canvas of the hangman. At the moment, it contains a placeholder image.
- `#instruct`: It currently contains a row of dashes representing letters to be guessed.
- `#feedback`: Hints and messages to the player.
- `#keyboard`: An on-screen keyboard.

Additionally, we have renamed `hangman.js` to `index.js` (a more conventional name) and linked it to `index.html`.

At the end of `index.js`, we have defined a function `init` that is called once the window has loaded.

`init` calls two functions: `drawKeyboard`, which creates a set of buttons making an on-screen keyboard.
And `startNewGame`, which at the moment inserts a random word as the content of the instruct section.

To see our new changes, [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/2...3?diff=split) showing the difference between branches 2 and 3.

## Usage

Open `index.html` in your browser (<kbd>Ctrl</kbd> + <kbd>O</kbd> in Linux/Windows or <kbd>Cmd</kbd> + <kbd>O</kbd> in Mac).

The script should be already running.
Do you see the keyboard or the dashes for the hangman word?

## Further Exploration

Console log the value of `word` before the closing brackets of the `startNewGame` function in `index.js`.
Afterward, save `index.js` and refresh the page in your browser.

Now, inspect the page with <kbd>F12</kbd> or by right-clicking on the page and selecting 'Inspect'.
Can you find the secret word displayed in the console?

It is a good habit to log the value of variables while you are developing a project.

<p align="right">(<a href="#top">back to top</a>)</p>
