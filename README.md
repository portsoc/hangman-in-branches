<div id="top"></div>

<!-- BRANCH TITLE -->

# Hangman in branches

<!-- ABOUT THE PROJECT -->

## About the project

This repository contains a worked solution to the [2021-2022 coursework for the Application Programming module](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit?usp).
View the "Core capabilities" section of this document to see the requirements we need to satisfy.

<!-- PREREQUISITES -->

## Prerequisites

### On University machines

1. Search for "Git GUI" and "Node.js" in [AppsAnywhere](https://appsanywhere.port.ac.uk) and launch them.

1. Launch an editor from AppsAnywhere (e.g., "Visual Studio Code" or "Atom").

### On your computers

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/).

1. Install an editor (e.g., [Visual Studio Code](https://code.visualstudio.com) or [Atom](https://atom.io)).

1. If you are new to GitHub, also install [GitHub Desktop](https://desktop.github.com) or [GitHub client](https://github.com/cli/cli).

<!-- CLONING -->

## Cloning

Don't download this repository as a zip file.
Instead, follow the instructions below to clone this repository (copy it) on your machine.

### Using Git

Open the shell (Terminal on Linux/Mac or Command Prompt/PowerShell in Windows) and run:

```
git clone https://github.com/portsoc/hangman-in-branches.git
```

### Using GitHub CLI

Run the following in a shell:

```
gh repo clone portsoc/hangman-in-branches
```

### Using GitHub Desktop

While this repository is open in the browser, click the green "Code" button and then "Open with GitHub Desktop".

### Using Visual Studio Code

1. Open Visual Studio Code and click the "Clone Repository" button in the start menu. 
1. Paste the link to this repository (`https://github.com/portsoc/hangman-in-branches`) in the dialog box.
1. Press enter and select a location on your computer to save the repository.
1. Now click "Open" to view the cloned repository in Visual Studio Code.

![Cloning repository in VSCode](https://i.imgur.com/Vh006gP.png)

For more information view this [instruction on how to clone a repository in Visual Studio Code](https://code.visualstudio.com/docs/editor/versioncontrol#_cloning-a-repository).

<!-- SELECTING A BRANCH -->

## Selecting a branch

This project is built in stages.
For simplicity, we have made a branch for each stage (but be aware that this is not a conventional use of branches).

Here is the link to all the branches on GitHub:

- Intro (current branch)
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
- [11: Linting](https://github.com/portsoc/hangman-in-branches/tree/11)
- [12: Database](https://github.com/portsoc/hangman-in-branches/tree/12)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

You could switch your copy of our code to a branch "x" (where x is a number) using any of the following tools:

### Using Git

Run the following in a shell (make sure to replace x with a branch number):

```
git checkout x
```

The following command shows you all the branches (hit <kbd>q</kbd> to exit):

```
git branch --all
```

### Using GitHub Desktop

Follow this [instruction on how to switch branches on GitHub Desktop](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/managing-branches#switching-between-branches).

### Using Visual Studio Code

Take a look at this [instruction on switching branches in Visual Studio Code](https://code.visualstudio.com/docs/editor/versioncontrol#_branches-and-tags).
It is rather easy to do:

![Switching branches in Visual Studio Code](https://i.imgur.com/BbbOurG.png)

1. Click on the "Checkout branch/tag" button in the bottom left corner of the screen (in the status bar).
1. Search for the name of the branch you want to switch to (e.g., 0) or select it from the dropdown list.

<!-- RUNNING AND VIEWING THE CODE -->

## Viewing the code

When viewing the code in your favourite editor, make sure you are opening the "hangman-in-branches" folder (not individual files within it).
So for example in Visual Studio Code, make sure you select "Open Folder" as opposed to "Open".

Always start by reading the `README.md` file to see what were the objectives for the branch and notes on its implementation.

We point out that the `.gitignore` file has been automatically generated for us by GitHub on the creation of a Node repository.
You don't need to worry about its content.
Generally speaking, it helps to ignore files that you don't want to be saved in your repository (e.g., settings of the code editor, temporary files, etc.).

<p align="right">(<a href="#top">back to top</a>)</p>
