<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 3: DOM

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

## Objectives

Our website needs a homepage.
So our first task is to create a simple HTML page.

All we care about at this stage is to have placeholders for different components of our game.
Therefore the **style of the page** is not important at the moment.


## Implementation

We have created a simple HTML page, titled `index.html`.

`index.html` begins with defining some standard metadata for the page such as the title, character set and viewport.

`index.html` also contains sections for the following:

  * **Noose**: The image/canvas of the hangman. At the moment it contains a placeholder image.
  * **Instructions**: It currently contains a row of dashes representing letters to be guessed.
  * **Feedback**: Hints and messages to the player.
  * **Keyboard**: An on-screen keyboard.

Additionally, we have renamed `hangman.js` to `index.js` (this is a more conventional name) and linked it to `index.html`.

At the end of `index.js`, we have defined a function `init()` that initializes the game once the window has loaded.

TODO: Add implementation for starting the game and drawing the keyboard

[Visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/2...3?diff=split) to see all the differences between branches 2 and 3.

## Usage

The file `hangman.js` is unchanged from the previous branch so after running the following command, you will be getting the same output:

```
node hangman.js
```

## Further Exploration

Can you work out our answers for the questions the `npm init` command asks us?
Use this as a template for your own projects.

<p align="right">(<a href="#top">back to top</a>)</p>
