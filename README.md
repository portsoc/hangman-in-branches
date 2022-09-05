<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 13: SVG

<!-- Navigation -->
<details>
  <summary>Navigate between branches</summary>  
  <nav class="menu">
    <li><a href="https://github.com/manighahrmani/hangman-in-branches">Intro</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/0">0: Variables</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/1">1: Functions</a></li>
    <li><a href="https://github.com/portsoc/hangman-in-branches/tree/2">2: NPM</a></li>
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
    <li>13: SVG (this branch)</li>
  </nav>
</details>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents of this branch</summary>
  <ol>
    <li><a href="#objectives">Objectives</a></li>
    <li><a href="#implementation">Implementation</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#todo">Todo</a></li>
    <li><a href="#further-exploration">Further Exploration</a></li>
  </ol>
</details>

## Objectives

In this branch, we will be using SVG (Scalable Vector Graphics, a markup language for two-dimensional vector graphics) to replace the canvas.

SVG is supported by all modern browsers and additionally, it is resolution independent and can be scaled up or down without losing quality. 
There are other benefits to SVGs for example the fact that they can be read by screen readers.

Take a look at what we have done here and try to use SVGs in your projects!

## Implementation

Let's begin by adding the SVG element to our HTML file:

```html
<?xml version='1.0' encoding='UTF-8' standalone='no' ?>
<svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewbox='0 0 300 400'>
    <line   id='n1' name='base'       x1='50' y1='350' x2='250' y2='350'></line>
    <line   id='n2' name='mast'       x1='200' y1='350' x2='200' y2='50'></line>
    <line   id='n3' name='crossbeam'  x1='200' y1='50' x2='100' y2='50'></line>
    <line   id='n4' name='rope'       x1='100' y1='50' x2='100' y2='125'></line>
    <circle id='n5' name='head'       cx='100' cy='150' r='25'></circle>            
    <line   id='n6' name='body'       x1='100' y1='175' x2='100' y2='250'></line>
    <line   id='n7' name='leftarm'    x1='50' y1='195' x2='100' y2='200'></line>
    <line   id='n8' name='rightarm'   x1='150' y1='195' x2='100' y2='200'></line>
    <line   id='n9' name='rightleg'   x1='100' y1='250' x2='150' y2='285'></line>
    <line   id='n10' name='leftleg'    x1='100' y1='250' x2='50' y2='285'></line>
</svg>
```

It begins with an optional XML declaration, followed by the SVG element itself. 
The SVG element has a version attribute, a namespace attribute, and a width and height attribute.
The viewbox attribute is used to specify the coordinate system of the SVG.
The SVG element contains a set of shapes, each of which has an id attribute. 
We will be using these ids to hide and show them with our script.

## Usage

### Prerequisites

This branch has been implemented to run in a Unix environment (e.g., your student VMs or Linux/macOS machines).
It is not tested on a Windows environment.
For more information on serving the site on [your student VM](http://port.ac.uk/myvm), revisit the [README of branch 9](https://github.com/portsoc/hangman-in-branches/tree/9#host-this-site).

We are also using [the PostgreSQL database](https://www.postgresql.org/download/) so make sure you have it installed on your machines (it is already installed on the student VMs).
Verify your installation by running the following command in a shell. It should output the version of PostgreSQL you are using:

```bash
psql --version
```

### Setup

Run the following command to install all the dependencies:

```bash
npm install
```

You also need to run the following command to set up the database and table:

```bash
npm run setup
```

Running the `setup` script may fail on your personal machines.
If this happens, begin by checking the configuration of the database in `server/config.js`.
Read the comments in this file and make sure you have the correct configuration.

If the error persists, switch the user in your shell by running the following command then re-run the setup script:

```bash
sudo su postgres
```

The above command (which will ask you for your system's password) will switch to the `postgres` user.
The `postgres` role comes with the installation of PostgreSQL and has all the privileges to create, drop, alter and modify databases.
When you are done with the setup, you can switch back to the original user by running:

```bash
exit
```

One last way the setup script can fail is if the database already exists.
To handle this error we have provided a clean-up script in `package.json` which will drop the database if it already exists.
See the [clean-up section](#cleanup) for more information.

### Run the server

Run the start script to start the server:

```bash
npm start
```

If you are running the server on your student VMs, you can now access it by visiting the IP address shown on the MyVM page or [upABCDEF.myvm.port.ac.uk](upABCDEF.myvm.port.ac.uk) where ABCDEF is replaced by your student number.
You may also need to specify the port by adding the port number to the end of the URL (e.g., [upABCDEF.myvm.port.ac.uk:8080](upABCDEF.myvm.port.ac.uk:8080)).

On your personal machines, the website will be running locally on port 8080 so view it by visiting http://localhost:8080 in your browser.

Once you are done, stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

### Clean-up

The setup script creates a database that will not be removed unless you run the clean-up script.
Execute the clean-up script by running the following command in the 0shell:

```bash
npm run clean-up
```

## Todo

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
