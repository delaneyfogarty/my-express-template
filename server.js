/* eslint-disable no-console */
const http = require('node:http');
const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 7890;
// what port our local server is on

const server = http.createServer(app);
// this creates an http server for our app to run on

server.listen(PORT, () => {
  console.log('🚀 Server running', server.address());
});
// when the server is started on our local port 7890, a 'server running' script is logged in the console along with the server address

process.on('exit', () => {
  console.log('👋  Goodbye!');
  pool.end();
});
// on exit of the server running, a goodbye script is logged in the console
// our pool is stopped meaning the connections to the server is stopped - pool takes over the responsibility of the connections so we can make multiple queries directly from it all performed in parallel instead of one after another
