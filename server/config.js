export default {
  // leave this line uncommented if running on our VM
  // comment the line below if running on your own machine
  // it specifies that the database is on the same machine (default is process.env.PGPORT)
  host: '/var/run/postgresql',

  database: 'hangmanDB',
  // number of milliseconds before a query call will timeout (default: no timeout)
  statement_timeout: 5000,
};
