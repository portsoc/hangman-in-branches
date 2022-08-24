<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 10: Style

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

Since we have completed every core feature of our game, we can now begin to style our website.
Our goal is not to create a visually stylish website, that would be the job of a front-end designer, not a software engineer.
We just aim to create a website that has a simple layout, consistent theme and is usable on a variety of devices.
Meanwhile, we should care about the quality of our CSS too (and maybe use some modern CSS features).

## Implementation

Start by creating `index.css` in the `client` folder (CSS is used to style the HTML page so it should not be in `server`).

### Colour palette

Let's start by creating a simple colour palette to be used throughout our website.
Instead of repeating our colours, we are going to define a set of properties at the root level which makes them globally accessible in our CSS.
If you find any of this confusing, we refer you to the MDN page on [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

```css
:root {
  --bg: #fff; /* background color: white */
  --fg: #000; /* foreground color: balck */
}
```

Using CSS variables makes it easy to change the colour palette of our website to make a dark theme.
A simple [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) is now enough to redefine the colour palette of our website.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #222; /* background color: black */
    --fg: #ccc; /* foreground color: grey */
  }
}
```

Notice that our colours are defined in the [hexadecimal syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color).
Now we can use these colours to style the background and the foreground colour of our elements.

```css
body,
main {
  background: var(--bg);
  color: var(--fg);
}
```

See all of our changes by visiting [this compare page](https://github.com/portsoc/hangman-in-branches/compare/8...9?diff=split).

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

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularize the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [x] As we have almost met all the core requirements, we can start with the style of our website.

- [ ] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
