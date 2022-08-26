<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 11: Linting

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

We are only humans, and we make mistakes.
Luckily, there is an automated way to check the quality of your code: Liners.
Before proceeding any further, make sure to visit the module resources, especially the [lint101 repository](https://github.com/portsoc/lint101).

## Implementation

We will start by following the installation steps stated in the [eslint-config-portsoc repository](https://github.com/portsoc/eslint-config-portsoc).
Note that the instructions here are written for Visual Studio Code, but things are pretty similar for other editors.

### Installing and configuring ESLint

We have previously installed packages using NPM that were needed for our website to function.
This time, we are installing the ESLint package that is only needed for developing our app (hence the `--save-dev` flag).

```bash
npm i --save-dev eslint eslint-config-portsoc
```

We are also installing this package with the configuration that we want to use (`eslint-config-portsoc`).
There are some more configurations that we need to add to our `package.json`.
Remember that the objects in a JSON file are comma-separated, so we need to add a comma before the end of the last object (this should be `devDependencies`):

```json
  "eslintConfig": {
  "extends": "portsoc",
  "root": true,
  "env": {
    "browser": true
  }
}
```

Make sure to check out the `package.json` file to see the changes our actions have made.

### Linting our app

The differences between our current branch and the last are shown [this compare page](https://github.com/portsoc/hangman-in-branches/compare/10...11?diff=split).

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

- [x] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
