<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 7: Modularisation

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

You can already see that our program is growing in size and complexity.
Not only do we have long functions that have repeated code, but `index.js` has way too many lines.

This makes it harder to read and debug our code or develop it further.
So in this branch, we will try not to implement any new features and just spend our time breaking down the existing code into smaller but tightly related modules.

We encourage you to visit the resources on moodle before continuing.
You should already be familiar with the concepts of modularisation and why it increases code quality.

## Implementation

### Grouping existing variables

We have grouped our variables `hits`, `misses`, `guessed`, `word` and `onGoing` into a single variable called `gameState`.
All those variables are now properties of `gameState`.

This will make more sense in the later branches (where `gameState` is fetched from the server).
We have also simplified things by calculating lives from the `misses` array.
This means we don't need a separate `lives` variable.

### Extracting repeated code into new functions

We have started by creating a `safeRemove` function.
This is because, on multiple occasions, we have used the same two lines of code to remove a DOM element.
So we have extracted these lines into a new function, called `safeRemove`, and we can reuse it.

Note that Visual Studio Code has a shortcut for this action:
First select a set of lines.
Then right-click and select "Refactor".
Afterward, select "Extract to function in module scope".

Similarly, we have created the `lives`, `hitsAndMisses`, `create` and `feedback` functions.

We can then improve these functions in later branches.
For example, we could improve `feedback` by displaying multiple DOM elements and giving them classes.
The important benefit of our changes is that we only have to update the function's definition, not every place where it was used.

Although our changes do not significantly decrease the volume of code, they help with the readability and maintainability.

### Extracting helper functions into a separate script

We have created a new file called `helpers.js` to contain all the helper functions.
These are functions that are not directly related to the game itself (and most importantly do not need access to the `gameState` variable).
These functions are `safeRemove`, `create`, and `drawKeyboard`.

We have on purpose kept `randomIndex` and `randomElement` in the `index.js` file.
This will make sense when you attempt the task mentioned under the <a href="#further-exploration">further exploration</a> section.

### Miscellaneous improvements

OK, we lied.
We have added a tiny feature.
To restart the game when `onGiong` is false, we can now use the keyboard.
It was done to speed up testing.

To see the new changes, head to [this compare page](https://github.com/portsoc/hangman-in-branches/compare/6...7?diff=split).

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

We have met all of the goals we have set previously.
So it is time to set out new goals for ourselves.
See the <a href="#further-exploration">further exploration</a>.

- [x] At the moment the user cannot win even if they guess all the letters correctly.

- [x] Another issue that we have is that the user can guess the same letter multiple times.

- [x] We have no way of restarting the game other than refreshing the page.

- [x] We have too many global variables and it is hard to keep track of the game's state.

- [x] We are not currently serving our game from a server.

- [x] The image of the hangman game is not updating as the game is being played.

## Further Exploration

Think about a restaurant.
Not all the functionalities take place in the front of the house.
For example, preparing the food is done at the back of the restaurant and is served to the client.

Similarly, some of the functions that we currently have in `index.js` of the `client` folder can be moved to the `server` folder (more specifically to `svr.js`).
This way we purposefully limit the client's access to some resources and instead ask them to send a request each time (using an API).

Your task in this branch is to decide which one of the functions and variables within `index.js` should be moved to files within the `server` folder.
Write down your guesses and compare them with other students, then check our model solution (the next branch).

<p align="right">(<a href="#top">back to top</a>)</p>
