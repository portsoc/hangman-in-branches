<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 2: NPM

<!-- Navigation -->
<details>
  <summary>Navigate between branches</summary>  
  <nav class="menu">
    <li><a href="https://github.com/manighahrmani/hangman-in-branches">Intro</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/0">0: Variables</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/1">1: Functions</a></li>
    <li>2: NPM (this branch)</li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/3">3: DOM</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/4">4: Events</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/5">5: Debugging</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/6">6: Canvas</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/7">7: Modularisation</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/8">8: Server Part 1</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/9">9: Server Part 2</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/10">10: Style</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/11">11: Linting</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/12">12: Database</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/13">13: SVG</a></li>
  </nav>
</details>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents of this branch</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

<a href="https://github.com/portsoc/hangman-in-branches/tree/1" class="previous">&laquo; Previous</a>
<a href="https://github.com/portsoc/hangman-in-branches/tree/3" class="next">Next &raquo;</a>

## Objectives

In this step, we will start to use the [NPM](https://www.npmjs.com/) package manager to install and manage dependencies for our project.

We highly urge you to visit the resources on moodle before proceeding.
Make sure to write and run the programs of [Code Examples to Copy, stage 4](https://portsoc.github.io/code-copy-examples/stage-4) on your computers or the university machines (this cannot be done on Replit).
Afterward, attempt the tests in the [node101 repository](https://github.com/portsoc/node101).

## Implementation

Using a shell, we have first navigated into this directory.
Next, we initiated a new Node project by running the following command.

```bash
npm init
```

This command generated the `package.json` file, which you can see in the directory. Note that we do not have a `package-lock.json` file yet as we have not installed any packages using NPM.

For more information on this, watch [our YouTube tutorial on NPM](https://youtu.be/2nFO0E6q-1o?t=570).

Remember to [visit this compare page](https://github.com/portsoc/hangman-in-branches/compare/1...2?diff=split) to see all the differences between branches 1 and 2.

## Usage

The file `hangman.js` is unchanged from the previous branch, so after running the following command, you will be getting the same output:

```
node hangman.js
```

## Further Exploration

How can you work out our answers for the questions the `npm init` command asks?
Once you find our answers, use them as a template for your projects.

<p align="right">(<a href="#top">back to top</a>)</p>
