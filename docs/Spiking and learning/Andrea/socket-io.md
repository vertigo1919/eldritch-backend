## Basics of socket.io

Socket.IO (WebSockets) allows a client and server to keep a persistent two-way connection so they can send messages to each other instantly, unlike normal HTTP requests where the client must repeatedly send separate request–response calls to the server.

### Backend

- Install nodemon, express, socket, dotenv
- Set up scripts
  - dev > nodemon listen.js
  - test > jest NODE_ENV=test
  - start > NODE_ENV=production node server.js
- require("dotenv").config() at top of listen.js

To use socket you want to wrap the Express app in an HTTP server. Once you've donw this this server can handle both normal HTTP requests and, once we attach Socket.IO, WebSocket upgrades.

```
                 ┌───────────────┐
                 │   HTTP SERVER │
                 └───────┬───────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
   Express routes                   Socket.IO
   (REST API)                       (Realtime)
         │                               │
   GET /api/users                  send-message
   POST /login                     receive-message
```

#### /app.js

Here you create an Express object and manage routes and middleware.

```js
const express = require('express');
const app = express();

// this is a placeholder for routes

module.exports = app;
```

#### /listen.js

This will create an http server that will use the express app for request handling. To do this you must

- import the express app, as well as http and socket

```js
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
```

- crete an http server that use your express app for requet hand

```js
const server = http.createServer(app);
```

- create a socket instance bound to this http server

```js
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});
```

- Set up socket:

You now define what happened everytime a client connects via Socket.IO to this server you do this by filling in this callback function.

```js
io.on('connection', (socket) => {});
```

In defining this you have a socket object representing the connection to a client.

Each connected client has a unique id. SO you want to log that.

```js
console.log('client connected:', socket.id);
```

- Then you decide what heppens when a clients sends a custom message e.g. one called "send-message".
  - here we log that we received it
  - and then biroad cast it to every client using `io.emit`
    - You can alse decide to send the message to:
      - `socket.emit()` only the current client
      - `socket.broadcast.emit()` everyone except sender
- and finally you want to log the disconnection of a client

```js
io.on('connection', (socket) => {
  console.log('client connected:', socket.id);

  socket.on('send-message', (msg) => {
    console.log('got message:', msg);
    io.emit('receive-message', msg); // send to all clients
  });

  socket.on('disconnect', () => {
    console.log('client disconnected:', socket.id);
  });
});
```

So the flow is:

```
Client A sends message
↓
Server receives
↓
Server sends message to ALL clients
```

- Then you launch the server on the correct port

```js
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
```

#### Final code:

app.js

```js
const express = require('express');
const app = express();

// this is a placeholder for routes

module.exports = app;
```

listen.js

```js
// the aim here is to wrap the Express app in an http server
// to allow this server to handle both normal http requests
// through the express APP but also sockets.

// we import the express app
const app = require('./app');

// imports needed for socket
const http = require('http');
const { Server } = require('socket.io');

// we create an http server that uses our express app for request handling
const server = http.createServer(app);

// then we need to create socket.io instance bound to this http server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Set up the sockets
io.on('connection', (socket) => {
  console.log('client connected:', socket.id);

  socket.on('send-message', (msg) => {
    console.log('got message:', msg);
    io.emit('receive-message', msg); // send to all clients
  });

  socket.on('disconnect', () => {
    console.log('client disconnected:', socket.id);
  });
});

// figure out what port to use (eitehr read it from env or defaul locally to 3000)
// then start this http+socket server

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
```

### Frontend

Then set up front end project

- npm create vite@latest
- npm install
- npm install socket.io-client
