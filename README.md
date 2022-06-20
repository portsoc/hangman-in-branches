# Hangman In Branches
<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
          <ul>
            <li><a href="#on-university-machines">On University machines</a></li>
            <li><a href="#on-your-computers">On your computers</a></li>
          </ul>
        </li>
        <li>
          <a href="#cloning">Cloning</a>
          <ul>
            <li><a href="#using-git">Using git</a></li>
            <li><a href="#using-github-cli">Using GitHub CLI</a></li>
            <li><a href="#using-github-desktop-client">Using GitHub Desktop</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#running-and-viewing-the-code">Running and viewing the code</a></li>
    <li>
      <a href="#documentation">Documentation</a>
      <ul>
        <li><a href="#objectives">Objectives</a></li>
        <li><a href="#implementation">Implementation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a solution to the [2021-2022 coursework for Application Programming](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit?usp). View the "Core capabilities" section within this document.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

#### On University machines 
  
  1. Search for "Git GUI" and "Node.js" in AppsAnywhere and launch them.
  
  1. Launch an editor from AppsAnywhere ("Visual Studio Code" or "Atom").

#### On your computers
  
  1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/).

  1. Install an editor (e.g., [VSCode](https://code.visualstudio.com)or [Atom](https://atom.io)).
  
  1. Optionally install [GitHub client](https://github.com/cli/cli) or [GitHub Desktop](https://desktop.github.com).

### Cloning

Do not download this repository as a zip file. 
Instead, follow the instructions below to clone this repository on your machine.

#### Using `git`

  ```
  git clone https://github.com/manighahrmani/kitten.git
  ```

#### Using GitHub CLI

  ```
  gh repo clone manighahrmani/kitten
  ```

#### Using the GitHub Desktop

  While this repository is open in the browser, click the green "Code" button and then "Open with GitHub Desktop".

### Select a branch
This example is built in stages. Each stage is in a branch labelled with numbers. 
To switch to branch "x" (where x is a number):

#### Using `git` in the shell

  ```
  git checkout x
  ```
  *Make sure to replace x with a branch* 
  
  To view all branches, run:
  
  ```
  git branch
  ```

#### Using GitHub Desktop client 
Follow this [instruction on how to switch branches on GitHub](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/managing-branches#switching-between-branches).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Running and viewing the code -->
## Running and viewing the code

1. Open the folder containing this file in your editor (not individual files).

1. Navigate to this folder using a shell (Terminal on Linux/Mac or Command Prompt/PowerShell in Windows) or open a new terminal from your editor and run:

    ```
    node hangman.js
    ```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Documentation -->
## Documentation

### Objectives

We currently aim to store the words for the game and test how we can select them.

### Implementation

`hangman.js` is created to hold the game's logic. In there, there is an array of strings called `words`. 
This array holds movie titles.

### Usage

When the `hangman.js` script is run with node, two words from `words` are selected and printed in the console.

<p align="right">(<a href="#top">back to top</a>)</p>
