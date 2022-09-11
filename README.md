<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 11: Linting

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
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
- [10: Style](https://github.com/portsoc/hangman-in-branches/tree/10)
- 11: Linting (current branch)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

There are always going to be errors in your code that are hard to spot.
You may also have bad practices that you don't know about.

Luckily, there is an automated way to check the quality of your code: Liners.
Before proceeding further, visit the module resources, specifically the [lint101 repository](https://github.com/portsoc/lint101) to learn more about linting.

We suggest you follow the instructions in the [implementations section below](#implementations) on the code from the previous branch to get a hang of how linting works.
Once you got it working (you can see errors and auto-fix them), you can proceed to apply it to the code for your submission.

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

Remember that the objects in a JSON file are comma-separated, so we first need to add a comma after the closing brackets of the last object (this should be `devDependencies`).
Then we can paste the following object:

```json
  "eslintConfig": {
  "extends": "portsoc",
  "root": true,
  "env": {
    "browser": true
  }
}
```

Check out the `package.json` file to see what it should look like.

### Linting our app

Once you have installed and fully configured ESLint, you should start seeing errors in the "Problems" view of Visual Studio Code.

To focus on the problems, hit <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on macOS to open Command Palette
Then search for "Focus on Problems View" and select it.

Here are the problems that we got after we started the linter on the code we had in [the previous branch](https://github.com/portsoc/hangman-in-branches/tree/10).
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
