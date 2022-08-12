/* eslint-disable no-console */
// we built this http.js server to manage requests/responses locally?? we did this as opposed to what?
const http = require('node:http');
// allows node.js to transfer data over an http - HYPERTEXT TRANSFER PROTOCOL

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ greeting: 'hello http' }));

  // creating a server called server using that http built-in node.js module
  // logging out the request url and request method that will be used to make requests?

  const paths = req.url.split('/');
  // splitting up the request url at every '/' into paths
  const path = paths[paths.length - 1];
  // i think this is taking away the '/' and leaving us with the actual name of the path?
  console.log('resource is', path);
  // logging out the name of this path

  const resource = routes[path];
  // setting a variable equal to an object 'routes' with a property of path - the routes include the previously defined variable 'path'

  if (!resource) {
    res.end('not found');
    return;
  }
  // if there is no resource (no routes with a path), the response is 'not found' and nothing will be returned

  const route = resource[req.method];
  if (route) {
    route(req, res);
  }
});
// a route is equal to a resource's request method

server.listen(3500, () => {
  console.log('server started', server.address());
});

// .listen() creates a listener on the specified 3500 port/path? then logs out the 'server started' script with the server address

const routes = {
  users: {
    GET(req, res) {
      res.end('users GET');
    },
    POST(req, res) {
      res.end('users POST');
    },
  },
};

// .end is a method used to end the response process
// the argument is the data the user wants to end the response with (returns an object)
// here i define the user routes and how i want them to end
