<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 9: Sever Part 2

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

Aside from minor improvements, we are aiming to close the following tasks that we opened in the to-do list of [the previous branch](https://github.com/portsoc/hangman-in-branches/tree/8):

- Calculating and displaying a score
- Hosting multiple games
- Modularising the server

## Implementation

### Calculating and displaying a score

### Hosting multiple games

### Modularising the server

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

Our to-do list at the moment is focusing mainly on the implementation of the server. We will later add more features to the client (e.g., CSS styling):

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularise the code in our server too).

- [ ] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [ ] As we have almost met all of the core requirements, we can start with the style of our website.

- [ ] We should lint our code, checking its quality, before submission (although this could have been done earlier too).

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
