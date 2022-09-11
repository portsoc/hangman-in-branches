<div id="top"></div>

<!-- BRANCH TITLE -->

# Branch 12: Database

- [Intro](https://github.dev/manighahrmani/hangman-in-branches)
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
- 12: Database(current branch)
- [13: SVG](https://github.com/portsoc/hangman-in-branches/tree/13)

## Objectives

Data should be stored in a database.
But so far, we have been storing our data in memory (saved inside JavaScript variables).
In this branch, we will demonstrate how you can have a database inside a Node.js application.

## Implementation

Our data, so far, consists of the `gamesInPlay` and `words` arrays both located on the server.
They differ significantly in nature: `gamesInPlay` is dynamic since it is updated as games are created or played.
On the other hand, `words` array is an example of static data.

To store the static data we are using a simple text file and for the dynamic data, we are using a PostgreSQL database.
The latter may be unnecessary, a non-relational database such as MongoDB or even a JSON file is better suited to store `gamesInPlay`.
Nevertheless, take our work as an example of how to use a database in a Node.js application.

What is important to note is that everything in the `client` folder remains unchanged.
At this stage, we do not want the client to know anything about the changes in our server.

### Static data

We have moved the array of `words` (previously in `server/data.js`) to a text file `server/data.txt`.
The words are now separated by a newline (`\n`) whereas before the array elements were separated by a comma (`,`).

To read the content of text files, we need to use the `fs` module.
Since `fs` is native to Node.js, we don't need to install anything.
`readWords` in `server/helper.js` uses the `readFileSync` function from the `fs` module to read the content of the data file synchronously.

### Dynamic data

To host a PostgreSQL database for our side, we obviously need to have PostgreSQL installed on our machines (as pointed out in the [usage section](#usage)).
Apart from this, we need to have a database for our data and a table in that database.
We are doing both of these tasks with the `setup` script we have added in `package.json`.

The `setup` script first creates a Postgres database `hangmanDB` using the `createdb` command.
Next, it uses the input redirection operator (`<`) to pass the content of `server/game.sql` file to `psql`'s `hangmanDB`.

After this setup, we need to connect to the database and insert/look up and update data in the table via JavaScript.
To be able to do this, we need to install the [`pg` package](https://www.npmjs.com/package/pg) using the following command:

```bash
npm install pg
```

We point out that this adds a new entry to the "dependencies" section of `package.json`.

Since we have modularized our server, we only need to import the `pg` module into `server/game.js`.
There we will use the `pg` module's `Client` class (for more information check out [this documentation page](https://node-postgres.com/api/client)).

First, we will construct an SQL client with the configurations defined in our `server/config.js` file.
Read this file and comment out the `host` if you are running the server on your machine.
After creating an SQL client we will attempt to connect to the database in the `connectToDB` function.
If the connection is established, we can use the client to query the database.
For example `createGame`, now inserts the game's values into the database by querying the SQL client.

The first thing to be careful of while dealing with the database is the difference in types.
The arrays we previously had in our JavaScript files are now stored as varchar in the database (see `server/game.sql`).
So we need to join the arrays before inserting/updating them in the database and split them when we retrieve them.

Secondly, the operation of querying the database is asynchronous, our functions have also been declared with the `async` keyword.
Sadly, this creates a problem in the `server/svr.js` script as [Expres routing](https://expressjs.com/en/starter/basic-routing.html) works differently for synchronous and asynchronous functions.
Previously, `createGame` was a synchronous function called as the response to the `\game\` path:

```js
app.post("/games/", createGame);
```

Now that `createGame` is asynchronous, our route handler must be changed to something like this:

```js
app.post("/games/", async (req, res) => {
  await createGame(req, res);
});
```

The only problem with the above handler is that it is assuming that the `createGame` function will always succeed.
To handle errors, Express needs our handler function to take an additional `next` parameter (for more info, read [this page on middlewares](https://expressjs.com/en/guide/using-middleware.html) or [this article on error handling in express](https://expressjs.com/en/guide/error-handling.html)).
All you need to remember is that our handler should catch possible errors and pass them to the next function:

```js
app.post("/games/", async (req, res, next) => {
  try {
    await createGame(req, res);
  } catch (e) {
    next(e || new Error());
  }
});
```

Using promises, we can make this more compact:

```js
app.post("/games/", (req, res, next) => {
  Promise.resolve(createGame(req, res)).catch((e) => next(e || new Error()));
});
```

To avoid writing all this code for every one of our routes, we are going to wrap our functions in `asyncWrap`:

```js
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next)).catch((e) => next(e || new Error()));
  };
}
```

View all the differences between our current branch and the last by visiting [this compare page](https://github.com/portsoc/hangman-in-branches/compare/11...12?diff=split).

## Usage

### Prerequisites

We have implemented the app to run in a Unix environment (e.g., [your student VMs](http://port.ac.uk/myvm) or Linux/macOS machines).
It is not tested on a Windows environment.
For information on using your student VM, revisit the [README of branch 9](https://github.com/portsoc/hangman-in-branches/tree/9#host-this-site).

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

Then run the following command to set up the database and create a table:

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

The above command (which asks you for your system's password) will switch to the `postgres` user.
The `postgres` role comes with the installation of PostgreSQL and has all the needed privileges.
After you have rerun the setup script, you can switch back to the original user with:

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

That's it 🥳!
We are done with our predefined tasks.
We still have [one more branch](https://github.com/portsoc/hangman-in-branches/tree/12) where we will replace our canvas with an SVG but our application will remain pretty much the same.

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularize the code in our server too).

- [x] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [x] As we have almost met all the core requirements, we can start with the style of our website.

- [x] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

### Improve choice of databases

Storing the `gamesInPlay` in a relational database is not the best choice.
After all, we are only storing one entity so there are no relations.
All we need is a collection of objects, not a relational database.

As a relatively easy challenge, we ask you to store the games in play as a JSON file as opposed to a PostgreSQL database.
You still need the `fs` module to read this file but remember to use [the JSON parse method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) to convert the data to a JavaScript object.

### Handle server errors

Indeed, we should not let the client know about the server's implementations.
However, we should be able to handle server errors (e.g., errors connecting to the database) and display a meaningful message to the client.

At the moment, the server (`server/svr.js`) responds with `null` if there was a database connection error in `server/game.js`.
What do you think the client sees in such a scenario?
Simulate this situation by running the clean-up script before starting the server or changing the database name in `server/config.js`.

A harsher alternative to responding with `null` is to kill the server with:

```js
process.exit(1);
```

Try it by uncommenting the line in the `connectToDB` function of `server/game.js` and see what happens when you start the server and try to access the website.

Here we are encouraging you to implement a middle ground where the server does not die but instead responds with a meaningful message to the client.
For example, the server can send the status code of 500 (Internal Server Error) and a message to the client.
The client can then display this message to the user so that they know what went wrong.

Check out [the server101 repository](https://github.com/portsoc/server101) for an example of how to handle errors.
Don't forget to prepare the client for the case where the server responds with an error.
The [messageboard repository](https://github.com/portsoc/staged-simple-message-board) is a simple example of how to handle errors on the client side.

<p align="right">(<a href="#top">back to top</a>)</p>
