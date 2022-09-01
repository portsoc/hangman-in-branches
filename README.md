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

Data should be stored in a database.

So far, we have been storing our data in memory (saved inside JavaScript variables).
But now we will demonstrate how you can have a database inside a Node.js application.

However, we admit that a hangman game may not be the best scenario to showcase this as we do not make permanent changes to our data:
The words do not change as games are played and the previously played games are deleted.
It would perhaps be a good idea to have a database if we had implemented a high-score feature.

## Implementation

Our data, so far, consists of the `gamesInPlay` and `words` arrays both located on the server.
They differ significantly in nature: `gamesInPlay` is dynamic in the sense that it is updated as games are created or played. Whereas, `words` array is an example of static data since it does not update as games are played (only the developer may choose to update the words).
Our solutions to how we store our data will be different as a result.

To store the static data we are using a simple text file and for the dynamic data, we are using a PostgreSQL database.
The latter may be overkill, we should ideally be using a non-relational database such as MongoDB or even a JSON file.
Nevertheless, take our work as an example of how to use a relational database in a Node.js application.

What is important to note is that our server (`server/svr.js`) and client (everything in the `client` folder) remain unchanged throughout all of our modifications.
We do not want the client to know anything about the changes in our server.

### Static data

We have moved the array of `words` (previously in `server/data.js`) to a text file `server/data.txt`.
The words are now separated by a newline (`\n`) whereas before the array elements were separated by a comma (`,`).

To read the content of `server/data.txt`, we need to use the `fs` module.
Note that the module is native to Node.js, so we don't need to install anything.
The `readWords` function in `server/helper.js` uses the `readFileSync` function from the `fs` module to read the content of the data file synchronously.

### Dynamic data

As pointed out in the [usage section](#usage), we need to have PostgreSQL installed on our machines.
Next, we need to have a database for our data and a SQL script to create the a table.
We are doing all of this with the `setup` script we have added in `package.json`.

Same as how the `start` script runs a command to serve the website, the `setup` script first creates a Postgres database `hangmanDB` using the `createdb` command.
Next, it uses the input redirection operator (`<`) to pass the content of `server/game.sql` file to `psql`'s `hangmanDB` thus creating our `game` table in that database.

After this setup, we need to connect to the database and insert/update the data in the table via JavaScript.
For this, we need to install the [`pg` package](https://www.npmjs.com/package/pg) using the following command:

```bash
npm install pg
```

We point out that this adds a new entry to the "dependencies" section of `package.json` (therefore `npm install` will install the package).

Since we have modularized our server, we need to import the `pg` module into `server/game.js` and create three functions corresponding to operations that we previously performed on `gamesInPlay` array: `addGame`, `getGame` and `updateGame` (maybe also `deleteGame` if you have implemented the feature to delete games).

Observe the name of the database in the `server/config.js` file.
Also, remember to comment out the `host` in this configuration file if you are running the server on your machine (leave it uncommented when running on your VM).
For more information on `pg.Client`, check out [this documentation page](https://node-postgres.com/api/client).

Check out the differences between our current branch and the last as shown on [this compare page](https://github.com/portsoc/hangman-in-branches/compare/11...12?diff=split).

## Usage

### Prerequisites

This branch has been implemented in a Unix environment (e.g., your student VMs or Linux/macOS machines) not Windows.
For more information on serving the site on [your student VM](http://port.ac.uk/myvm), revisit the [README of branch 9](https://github.com/portsoc/hangman-in-branches/tree/9#host-this-site).

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

For now, we are using the default role that comes with our implementation.
This is usually the username that you have in your VM or the role `postgres` that comes with the installation of PostgreSQL.

Running the `setup` script may fail on your personal machines.
If this happens, first switch the user by running the following command then re-run the setup script:

```bash
sudo su postgres
```

The above command (which will ask you for your system's password) will switch to the `postgres` user.
Once you are done, you can switch back to the original user by running:

```bash
exit
```

Note that the setup is only run once.
If you already have a `hangmanDB` database, drop it by running the following command:

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

- [x] As we have almost met all the core requirements, we can start with the style of our website.

- [x] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

Our text file can be huge in size and loading all of it to then select a single element may become a waste of resources on our server.
Update storage of words so that instead of reading the entirety of the text file, only a random line (a single word) is read.

As a second challenge, try to store the games in play as a JSON file as opposed to a PostgreSQL database.
All we need is a collection of objects, not a relational database.

<p align="right">(<a href="#top">back to top</a>)</p>
