<div id="top"></div>

<!-- BRANCH TITLE -->

# Hangman In Branches

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#prerequisites">Prerequisites</a>
      <ul>
        <li><a href="#on-university-machines">On University machines</a></li>
        <li><a href="#on-your-computers">On your computers</a></li>
      </ul>
    </li>
    <li>
      <a href="#cloning">Cloning</a>
      <ul>
        <li><a href="#cloning-using-git">Cloning using Git</a></li>
        <li><a href="#cloning-using-github-cli">Cloning using GitHub CLI</a></li>
        <li><a href="#cloning-using-github-desktop-client">Cloning using GitHub Desktop</a></li>
      </ul>
    </li>
    <li>
      <a href="#selecting-a-branch">Selecting a branch</a>
      <ul>
        <li><a href="#selecting-a-branch-using-git">Selecting a branch using Git</a></li>
        <li><a href="#selecting-a-branch-using-github-desktop">Selecting a branch using GitHub Desktop</a></li>
      </ul>
    </li>
    <li><a href="#viewing-the-code">Viewing the code</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the project

This repository contains a worked solution to the [2021-2022 coursework for the Application Programming module](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit?usp). View the _Core capabilities_ section within this document.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- PREREQUISITES -->

## Prerequisites

### On University machines

1. Search for _Git GUI_ and _Node.js_ in [AppsAnywhere](https://appsanywhere.port.ac.uk) and launch them.

1. Launch an editor from AppsAnywhere (e.g., _Visual Studio Code_ or _Atom_).

### On your computers

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/).

1. Install an editor (e.g., [VSCode](https://code.visualstudio.com)or [Atom](https://atom.io)).

1. Optionally install [GitHub client](https://github.com/cli/cli) or [GitHub Desktop](https://desktop.github.com).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CLONING -->

## Cloning

Try not to download this repository as a zip file.
Instead, follow the instructions below to clone this repository on your machine.

### Cloning using Git

Open the shell (Terminal on Linux/Mac or Command Prompt/PowerShell in Windows) and run:

```
git clone https://github.com/portsoc/hangman-in-branches.git
```

### Cloning using GitHub CLI

Run the following a shell:

```
gh repo clone portsoc/hangman-in-branches
```

### Cloning using the GitHub Desktop

While this repository is open in the browser, click the green _Code_ button and then _Open with GitHub Desktop_.

<!-- SELECTING A BRANCH -->

## Selecting a branch

This example is built in stages.
Each stage is in a branch labeled with numbers.
To switch to a branch _x_ (where x is a number):

### Selecting a branch using Git

Run the following in a shell (make sure to replace x with a branch number):

```
git checkout x
```

To see all branches, run:

```
git branch
```

### Selecting a branch using GitHub Desktop

Follow this [instruction on how to switch branches on GitHub Desktop](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/managing-branches#switching-between-branches).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- RUNNING AND VIEWING THE CODE -->

## Viewing the code

After selecting a branch, you can view the code in your favorite editor.

Make sure to open the hangman folder (not individual files).

Always start by reading the `README.md` file to see what were the objectives for the branch and notes on its implementation or features.

<p align="right">(<a href="#top">back to top</a>)</p>
