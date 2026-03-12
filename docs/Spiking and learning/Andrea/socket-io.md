# Basics of socket.io

Socket.IO (WebSockets) allows a client and server to keep a persistent two-way connection so they can send messages to each other instantly, unlike normal HTTP requests where the client must repeatedly send separate request–response calls to the server.

## A basic example "ChatTest"

To learn how to use it let's create a frontend that takes messages in a form, on submission it sends them to the backend via a socket connection, and then the backend, as it receives them, it instantly broadcasts thems to all the socket clients that, as soon as they receive them, they disaply it.

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

You now define what happens everytime a client connects via Socket.IO to this server you do this by defining this callback function.

```js
io.on('connection', (socket) => {});
```

In defining this you have a socket object representing the connection to a client.

Each connected client has a unique id. SO you want to log that.2

```js
console.log('client connected:', socket.id);
```

- Then you decide what heppens when a clients sends a custom message e.g. one called "send-message".
  - we log that we received it
  - and then broadcast it to every client using `io.emit`
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

1. Craete a "ChatTest.jsx" component and render it in app.jsx

```js
import { useState } from 'react';
import ChatTest from './ChatTest';

function App() {
  const [count, setCount] = useState(0);

  return <ChatTest />;
}

export default App;
```

2. Then we write the code for the chat component

```js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// we create a socket connection to the server
// for simplicty we create it here but best practice is either to
// A) Create it ann export it in a seprate socket.js file
// B) Creata a custom hook that returns it
const socket = io('http://localhost:3000');

export default function ChatTest() {
  // we create a state for the form input
  const [input, setInput] = useState('');

  // and a state for the messages received by the socket backend
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribes to the "connect" event of the socket
    // if successful it logs it
    socket.on('connect', () => {
      console.log('connected:', socket.id);
    });

    //Subscribes to the custom "receive-message" event we defined
    // in the backend which broacast whatever the backend receives
    // to the front end via this socket
    // when this happens this callback is then run which
    // adds the message to the message status
    // and ret
    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // here we define the funcion that runs on unmounting
    // of this component
    // we remove the sockets in order to avoid memory leaks
    return () => {
      socket.off('receive-message');
      socket.off('connect');
    };
  }, []);

  const handleSubmit = (e) => {
    //we stop the browser default behaviour on click
    e.preventDefault();

    // we prevent empty submission
    if (!input.trim()) return;

    // we send the message via socket to the server
    socket.emit('send-message', input);

    // we clear the form
    setInput('');
  };
  return (
    <div>
      <h1>Socket test</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Send</button>
      </form>

      <ul>
        {/* we map over the array to print the messages 
        we use the array index (i) as the react key */}
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
```

### How to run it

- To run it start your backend with `npm run dev` the local server will start listening on port 3000
- Then seprately run `npm run dev` in your front end which will start the vite dev server
- then open many different tabs at http://localhost:5173/ and you will see that when you submit a message in one, it appears in all the others.
