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

Note that we are implementing the database in a Unix environment (e.g., your student VMs or Linux/MacOS machines).
Our instructions have not been tested on Windows machines.

For now, we are using the default `postgres` user that comes with the installation of PostgreSQL.
If running the `setup` script fails, make sure that you switch to this user by running:
  
```bash
sudo su postgres
```

The above command will switch to the `postgres` user.
Once you are done, you can switch back to the original user by running:
  
```bash
exit
```


Check out the differences between our current branch and the last as shown on [this compare page](https://github.com/portsoc/hangman-in-branches/compare/11...12?diff=split).

## Usage

Run the following command to install all the dependencies:

```
npm install
```

Next, run the start script to start the server:

```
npm start
```

The website is now running locally on port 8080 so view it by visiting http://localhost:8080 in your browser.
Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd> in the shell.

## Todo

- [x] We still have not satisfied one of the core requirements of displaying how many moves it took to win as a score.

- [x] The server is only capable of handling one game at a time. We need to add a mechanism to handle multiple games simultaneously. This could be a nice additional feature (as suggested in [the coursework specification](https://docs.google.com/document/d/1cF3u2ldutHaBAzFOEsnVwfKrnPTylOrn-hAGFSDWca8/edit)).

- [x] `server/svr.js` should be split into multiple files (we need to modularize the code in our server too).

- [x] Data should be stored in a database. We need a better way to store `words` and maybe the state of games at play.

- [x] As we have almost met all the core requirements, we can start with the style of our website.

- [x] We should lint our code, checking its stylistic quality, before submission.

## Further Exploration

<p align="right">(<a href="#top">back to top</a>)</p>
