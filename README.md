<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 11: Linting

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
      <ol>
        <li><a href="#installing-eslint">Installing ESLint</a></li>
        <li><a href="#linting-our-app">Linting our app</a></li>
      </ol>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#todo">Todo</a></li>
  </ol>
</details>

<a href="https://github.com/portsoc/hangman-in-branches/tree/10" class="previous">&laquo; Previous</a>
<a href="https://github.com/portsoc/hangman-in-branches/tree/12" class="next">Next &raquo;</a>

## Objectives

We are only humans, and we make mistakes.
Luckily, there is an automated way to check the quality of your code: Liners.
Before proceeding further, visit the module resources, specifically the [lint101 repository](https://github.com/portsoc/lint101).

## Implementation

We will start by following the installation steps stated in the [eslint-config-portsoc repository](https://github.com/portsoc/eslint-config-portsoc).
Note that the instructions here are written for Visual Studio Code, but things are similar for other editors.

### Installing ESLint

Begin by installing [the ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in Visual Studio Code.
For more information on installing extensions, see [this guide for Visual Studio Code](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-an-extension).

We have previously installed packages using NPM that were needed for our website to function.
This time, we are installing the ESLint package that is only needed for developing our app (hence the `--save-dev` flag).

Run the following command in the terminal:

```bash
npm i --save-dev eslint eslint-config-portsoc
```

We are installing this package with the needed configuration (`eslint-config-portsoc`).
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

Check out the `package.json` file to see the changes our actions have made.

### Linting our app

Once you have installed and fully configured ESLint, you should start seeing errors in the Problems view of Visual Studio Code.
To focus on the problems, hit <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Mac to open Command Palette
Then search for "Problems: Focus on Problems View" and select it.

If you do this on the code from [the previous branch](https://github.com/portsoc/hangman-in-branches/tree/10), you should see the following errors.
Remember that sometimes you will have to save the code before you can see the errors.

![Screenshot of the errors picked up by the linter](https://i.imgur.com/wDlqZhI.png)

Click once on the error to open the file in the editor, focusing on the line that causes the error.
Right-click on each of these errors to see the options you have.
If you are confused by them, visit the documentation for the error (if it exists).
Then if you understand the error, you can select the fix or the fix all option from the menu.

The code that we have in the current branch is not perfect, but it has passed all the checks that the linter carries out.
Check out the differences between our current branch and the last as shown on [this compare page](https://github.com/portsoc/hangman-in-branches/compare/10...11?diff=split).

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

<p align="right">(<a href="#top">back to top</a>)</p>
