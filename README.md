<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 2: NPM

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
- [0: Variables](https://github.com/portsoc/hangman-in-branches/tree/0)
- [1: Functions](https://github.com/portsoc/hangman-in-branches/tree/1)
- 2: NPM (current branch)
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

## Objectives

So far we only had a script file that we ran with node. 
This is fine for small projects, but as we are going to make a medium sized application it is better to use a package manager. 
This branch will introduce you to [NPM](https://www.npmjs.com/), the Node Package Manager.
One of the most important reasons we need NPM is to install and manage dependencies for our project.

We highly urge you to visit the resources on moodle before proceeding.
Make sure to write and run the programs of [Code Examples to Copy, stage 4](https://portsoc.github.io/code-copy-examples/stage-4) on your computers or the university machines (this cannot be done on Replit).
Afterward, attempt the tests in the [node101 repository](https://github.com/portsoc/node101).

## Implementation

Using a shell, we have first navigated into this directory.
Next, we initiated a new Node project by running the following command.

```bash
npm init
```

If you have any errors, make sure that you have Node installed (on university machines launch "Node.js" from AppsAnywhere).

This command generates the `package.json` file, which you can see in the directory.
Note that we do not have a `package-lock.json` file yet as we have not installed any packages using NPM.
For more information, watch [our video tutorial on NPM](https://youtu.be/2nFO0E6q-1o?t=570).

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
