<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 12: Database

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

## Implementation

### Storing static data in local storage

### Storing dynamic data in a database

Check out the prerequisites in [the usage section](#usage) before reproducing the implementation.

Check out the differences between our current branch and the last as shown on [this compare page](https://github.com/portsoc/hangman-in-branches/compare/11...12?diff=split).

## Usage

### Prerequisites

This branch has been implemented in a Unix environment (e.g.,your student VMs or Linux/macOS machines) not Windows.
For more information on serving the site on [your student VM](http://port.ac.uk/myvm),revisit the [README of branch 9](https://github.com/portsoc/hangman-in-branches/tree/9#host-this-site).

We are also using [the PostgreSQL database](https://www.postgresql.org/download/) so make sure you have it installed on your machines (it is already installed on the student VMs).
Verify your installation by running the following command which should output the version of PostgreSQL you are using:

```bash
psql --version
```

### Setup

Run the following command to install all the dependencies:

```bash
npm install
```

You also need to run the following command to set up the database:

```bash
npm run setup
```

For now,we are using the default role that comes with our implementation.
This is usually the username that you have in your VM or the role `postgres` that comes with the installation of PostgreSQL.

Running the `setup` script may fail on your personal machines.
If this happens,first switch the user by running the following command then re-run the setup script:

```bash
sudo su postgres
```

The above command (which will ask you for your system's password) will switch to the `postgres` user.
Once you are done,you can switch back to the original user by running:

```bash
exit
```

Note that the setup is only run once.
If you already have a `hangmanDB` database,drop it by running the following command:

```bash
dropdb hangmanDB
```

### Run the server

Run the start script to start the server:

```bash
npm start
```

### Access the site

If you are running the server on your student VMs, you can now access it by visiting the IP address shown on the MyVM page or [upABCDEF.myvm.port.ac.uk](upABCDEF.myvm.port.ac.uk) where ABCDEF is replaced by your student number.
You may also need to specify the port by adding the port number to the end of the URL (e.g., [upABCDEF.myvm.port.ac.uk:8080](upABCDEF.myvm.port.ac.uk:8080)).

On your machines, the website will be running locally on port 8080 so view it by visiting http://localhost:8080 in your browser.
Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

## Todo

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularize the code in our server too).

- [x] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [x] As we have almost met all the core requirements,we can start with the style of our website.

- [x] We should lint our code,checking its stylistic quality,before submission.

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
