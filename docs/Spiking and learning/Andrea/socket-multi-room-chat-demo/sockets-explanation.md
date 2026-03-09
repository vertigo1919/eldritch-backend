## Web sockets theory

Standard HTTP communication is unidirectional and transient: a client sends a request, the server processes it, sends a response, and the connection closes.

Socket.io relies on the WebSocket protocol, which creates a persistent, bidirectional, full-duplex connection between the client and the server over a single TCP connection.

- **Persistent Connection:** Once established, the connection remains open until either the client or the server explicitly terminates it. Both parties can send data at any time without requiring a new request.

- **Events:** Socket.io uses an event-driven architecture. Data is transmitted by specifying an event name (a string) and a payload (the data).
- **`emit`:** The method used to transmit data. You specify the event name and the payload. (e.g., `socket.emit("send-message", data)`).

- **`on`:** The method used to register an event handler. When the application receives an event matching the specified string, it executes the provided callback function. (e.g., `socket.on("receive-message", (data) => {...})`).

- **Rooms:** Socket.io includes a built-in grouping mechanism called "rooms." A socket can `join` or `leave` a room by specifying a room name. The server can then use `io.to(roomName).emit(...)` to send an event exclusively to the sockets grouped in that specific room.

## Setup

### Backend

- Install nodemon, express, socket, dotenv
- Set up scripts
- dev > nodemon listen.js
- test > jest NODE_ENV=test
- start > NODE_ENV=production node server.js
- require("dotenv").config() at top of listen.js

To use socket you want to wrap the Express app in an HTTP server. Once you've donw this this server can handle both normal HTTP requests and, once we attach Socket.IO, WebSocket upgrades.

![[Screenshot 2026-03-09 at 09.49.06.png]]

#### /app.js

Here you create an Express object and manage routes and middleware.

```js
const express = require("express");

const app = express();

// this is a placeholder for routes

module.exports = app;
```

#### /listen.js

This will create an http server that will use the express app for request handling. To do this you must

- import the express app, as well as http and socket

```js
const app = require("./app");

const http = require("http");

const { Server } = require("socket.io");
```

- crete an http server that use your express app for requet hand

```js
const server = http.createServer(app);
```

- create a socket instance bound to this http server

```js
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",

    methods: ["GET", "POST"],
  },
});
```

- Set up socket:

You now define what happens everytime a client connects via Socket.IO to this server you do this by defining this callback function.

```js
io.on("connection", (socket) => {});
```

In defining this you have a socket object representing the connection to a client.

Each connected client has a unique id. SO you want to log that. Then you define the custom events emits and event handlers.

```js
console.log("client connected:", socket.id);
```

### Frontend

Then set up front end project

- npm create vite@latest
- npm install
- npm install socket.io-client

1. Craete a "ChatTest.jsx" component and render it in app.jsx

```js
import { useState } from "react";

import ChatTest from "./ChatTest";

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

const socket = io('http://localhost:3000');


export default function ChatTest() {


useEffect(() => {

// Subscribes to the "connect" event of the socket

// if successful it logs it

socket.on('connect', () => {

console.log('connected:', socket.id);

});

```

## App objective

We are creating a room based chat app that has 3 screens rendered conditionally based on the phase

1 Joining: a user must input their disaply name and then either click on create room or join one via code
2 Lobby: we display users connected and a button to start chatting
3 Chatting: simple send a message that's shown to all clients connected in the room

## Custom events

### 1. Client-to-Server Events (Initiating Actions)

These are the events transmitted from the React frontend to the Express/Socket.io backend when a user interacts with the interface.

| **Event Name** | **User Action**                     | **Payload Sent**                                | **Server Execution**                                                                                                                                                              |
| -------------- | ----------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create-room`  | Submits the "Create New Room" form. | `{ displayName: "String" }`                     | Generates a 6-character code, assigns the display name to the socket object, adds the socket to a room with that code, creates a room record in memory, and emits `room-updated`. |
| `join-room`    | Submits the "Join Room" form.       | `{ displayName: "String", roomCode: "String" }` | Verifies the room exists in memory, assigns the display name to the socket object, adds the socket to the room, updates the user array in memory, and emits `room-updated`.       |
| `send-message` | Submits the chat input form.        | `{ roomCode: "String", message: "String" }`     | Targets the specific room using the provided code and emits `receive-message` to all connected sockets in that specific group.                                                    |

### 2. Server-to-Client Events (UI Updates)

These are the events transmitted from the backend to the frontend to update the React state and render new information on the screen.

| **Event Name**    | **Server Trigger**                                                              | **Payload Received**                                    | **Frontend Execution**                                                                                        |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `room-updated`    | Triggered after a successful `create-room`, `join-room`, or `disconnect` event. | `{ roomCode: "String", users: [Array of Objects] }`     | Updates the `roomCode` state, updates the `users` array state, and sets the application phase to "lobby".     |
| `receive-message` | Triggered after the server processes a `send-message` event.                    | `{ message: "String", from: "String", uuid: "String" }` | Appends the new message object to the existing `messages` array state, causing the UI to render the new text. |

### 3. Built-in Protocol Events

These events are native to Socket.io and handle the physical connection status rather than custom application logic.

| **Event Name** | **Trigger**                                                      | **Location** | **Execution**                                                                                                                                                               |
| -------------- | ---------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connection`   | A client successfully establishes a WebSocket connection.        | Server       | Logs the unique socket ID to the console and registers the custom event handlers for that specific client.                                                                  |
| `connect`      | The frontend successfully establishes the connection.            | Client       | Logs the successful connection and the assigned socket ID to the browser console.                                                                                           |
| `disconnect`   | The network connection drops or the user closes the browser tab. | Server       | Iterates through the in-memory rooms object, removes the disconnected socket ID from any user arrays, deletes empty rooms, and emits `room-updated` to any remaining users. |

## Flow in the app

### 1. Establishing the Connection

When the user opens the application in their browser, the initial handshake occurs automatically before any user interaction.

- **Server `connection`:** The Node backend detects the incoming WebSocket request, registers the connection, assigns a unique socket ID, and attaches the event listeners for this specific client.
- **Client `connect`:** The React frontend confirms the connection is established and logs the socket ID to the browser console.

### 2. Room Creation or Entry (Joining Phase)

The user is currently on the "joining" screen. They type their display name and choose to either create a new room or join an existing one.

- **Client `create-room` or `join-room`:** The user submits a form. The frontend emits the respective event to the server, passing the user's display name (and room code, if joining) as the payload
- **Server processes `create-room` or `join-room`:** The backend receives the payload. It either generates a new room code or verifies an existing one, adds the socket to the designated room group, and updates the in-memory `rooms` object.
- **Server emits `room-updated`:** Immediately after modifying the `rooms` object, the backend broadcasts this event back to the client(s) in the room, containing the room code and the updated array of users.
- **Client receives `room-updated`:** The frontend receives the new data, updates the local React state (`roomCode` and `users`), and changes the `phase` state to "lobby", rendering the lobby screen.

### 3. Messaging (Chatting Phase)

The user has clicked "Go to chat" and is now on the "chatting" screen. They type a message and submit the form.

- **Client emits `send-message`:** The frontend transmits the event, sending the typed message and the current room code to the backend.
- **Server receives `send-message`:** The backend identifies the target room from the payload.
- **Server emits `receive-message`:** The backend broadcasts the message payload (including the sender's display name) exclusively to the sockets currently grouped in that specific room.
- **Client receives `receive-message`:** The frontend of every user in that room receives the event and appends the new message object to the `messages` array in the React state, rendering the text on the screen.

### 4. Termination

The user closes the browser tab, navigates away, or loses their internet connection.

- **Server `disconnect`:** Socket.io automatically detects the closed connection. The backend executes the disconnect logic, iterating through the `rooms` object to remove the disconnected socket ID from the users array and deleting the room if it becomes empty.
- **Server emits `room-updated`:** If there are remaining users in the room, the backend broadcasts the updated user array to them.
- **Remaining Clients receive `room-updated`:** The remaining users' frontends update their local state, removing the disconnected user from their rendered list.
