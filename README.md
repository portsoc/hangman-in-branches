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


## Implementation

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
