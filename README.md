<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 10: Style

- [Intro](https://github.com/portsoc/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- [2: NPM](https://github.com/portsoc/hangman-in-branches/tree/2)
- [3: DOM](https://github.com/portsoc/hangman-in-branches/tree/3)
- [4: Events](https://github.com/portsoc/hangman-in-branches/tree/4)
- [5: Debugging](https://github.com/portsoc/hangman-in-branches/tree/5)
- [6: Canvas](https://github.com/portsoc/hangman-in-branches/tree/6)
- [7: Modularisation](https://github.com/portsoc/hangman-in-branches/tree/7)
- [8: Server Part 1](https://github.com/portsoc/hangman-in-branches/tree/8)
- [9: Server Part 2](https://github.com/portsoc/hangman-in-branches/tree/9)
- 10: Style (current branch)
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

Since we have completed every core feature of our game, we can now begin to style our website.
Our goal is not to create a visually stylish website.
That would be the job of a front-end designer, not the main responsibility of a software engineer.

We just aim to create a website that has a simple layout, consistent theme and is usable on a variety of devices.
Meanwhile, we could use some modern CSS features.

If you have not already done so, visit the Moodle resources on the topic of CSS.
Be sure to check out the examples on custom properties and flexbox in the [CSS repository](https://github.com/portsoc/ws_css3).

## Implementation

We started by creating `index.css` in the `client` folder (CSS is used to style the HTML page so it should not be in `server`)
Then we linked our CSS in our `index.html` file.
Below we have listed the notable style decisions we have made.

### Size and alignment

We start by centre-aligning elements and specifying a flexible layout (using [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)).
Since we want our sections to stack on top of each other vertically (like a column), we have to specify a `flex-direction` of `column`.

```css
body,
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

In addition to this, we are also going to add margins and paddings to our elements.
Pay attention to our units and notice that we are avoiding absolute measurements in favour of relative ones such as percentages, `em` or `vw`.
For more information check out this page on [CSS units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units).

### Colours

Let's define a simple colour palette to be used throughout our website.
So instead of repeating our colours, we are going to define a set of properties (at the root level) which makes them globally accessible.
If you find any of this confusing, we refer you to the MDN page on [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

```css
:root {
  --bg: #fff; /* background color: white */
  --fg: #000; /* foreground color: balck */
}
```

Using CSS variables makes it easy to change the colours of our website to make a dark theme.
We can now do this using a simple [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) which redefines the colour palette.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #222; /* background color: black */
    --fg: #ccc; /* foreground color: grey */
  }
}
```

Note that the user's device/browser preference decides the colour palette of our website.
We also point out that our colours are defined in the [hexadecimal syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color).

Now we can use these colours to change the background and the foreground colour of all elements.
We do this by adding the following to the properties of `body` and `main`:

```css
background: var(--bg);
color: var(--fg);
```

### Guessed letters

One thing that we could not easily fix with HTML or JavaScript is the presentation of the `#guessMe` element.
We are going to add spaces between the `span` elements and generally make things more legible by increasing the size of the letters.

```css
#guessMe span {
  font-size: min(6vw, 140%);
  margin: 0.25em;
  min-width: 1em;
}
```

### Keyboard

To make our keyboard more like a real keyboard, we need to rework our `drawKeyboard` function in `client/helper.js`.
`drawKeyboard` now splits the buttons into three rows, similar to a QWERTY keyboard.
Observe how we are adding a class `.letterRow` to the rows, this will be useful shortly.

Back in CSS we use this class name and specify the width of the rows.
But more importantly, we specify the direction in which the elements within them are stacked (horizontally).
Remember that we already have rules for centre alignment of elements (being applied to `main` and `body`).
So we just have to add the following to our CSS:

```css
.letterRow {
  max-width: 100vw;
  flex-direction: row;
}
```

Another thing of note is that we are adding a `hit` and `miss` class to the keys in `redrawKeyboard` of `client/index.js`.
Using these classes, we can colour the keys differently when we are disabling them.
Notice how added these colours to our existing colour palette and distinguished foreground and background colours using prefixes `--fg` and `--bg`.

```css
.hit {
  color: var(--fg-hit);
  background: var(--bg-hit);
}

.miss {
  color: var(--fg-miss);
  background: var(--bg-miss);
}
```

### Canvas

To accommodate devices with small screens, we are going to set out the maximum size of this element using CSS.
Our change makes the canvas element smaller (as well as the hangman figure drawn on it).

```css
canvas {
    max-width: 10em;
    max-height: 15em;
}
```

To balance this, we can decrease the size of the canvas element in the HTML page so that the hangman figure itself appears bigger (remember that the figure is drawn relative to the size of the canvas).

We've also updated the `drawHangman` function in `client/canvas.js` so that the background colour reflects whether the last guess was a hit or a miss.

### Favicon

If you have been checking out the console in the inspection tools, you may have noticed the following error:

```
Failed to load resource: net::ERR_EMPTY_RESPONSE
```

The fix of this error is not related to styles.
We just need to add a favicon to our `client` folder.
You can easily get one using [online favicon generators](https://favicon.io).

See all of our changes by visiting [this compare page](https://github.com/portsoc/hangman-in-branches/compare/9...10?diff=split).

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

Our website is not adjusting to device orientation (it is designed to work in portrait mode only).
Similar to how we implemented the colour palette, we can define a set of custom properties for the flow direction and sizes of our elements.
Furthermore, we can use media queries to reset the value of these variables depending on the orientation of the device.

Your task is to make sure that our website is responsive to device orientation.
We recommend you check out [this page on device orientations](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation).

<p align="right">(<a href="#top">back to top</a>)</p>
