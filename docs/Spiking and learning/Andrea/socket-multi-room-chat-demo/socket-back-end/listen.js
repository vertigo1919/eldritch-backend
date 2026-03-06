// This is the backend for a basic multiroom chatapp
// We are creating a room based chat app that has 3 screens rendered conditionally based on the phase
// 1 Joining: a user must input their disaply name and then either click on create room or join one via code
// 2 Lobby: we display users connected and a button to start chatting
// 3 Chatting: simple send a message that's shown to all clients connected in the room

// SOCKET SCHEMA:

// CLIENT TO SERVER EVENTS

// create-room:
// - when a user clicks on create room
// - payload: {displyName: "TestUser"}
// - server action: create a code, join socket to the room with that code, build users array

// join-room:
// - when a user cliks on join room
// - payload: {displyName: "TestUser", roomCode: "ABCDE"}
// - server action: check room exists, join socket to the room with that code, build users list

// send-message:
// - when a user clicks on send message
// - payload {message: "This is a test message"}
// - server action: the server broadcasts it to all users in the room

// SERVER TO CLIENT EVENTS

// room-updated
// - when the server detects a new user (following create-room or join-room)
// - payload: { roomCode: "ABCDE", users: [ { userId: "uuid-1", name: "Alice" },{ userId: "uuid-2", name: "Bob" }]}
// - fe effect: show code and list of connected users

// receive-message
// - when the server receives a message from a client (following send-message)
// - payload: {message: "This is a test message"}
// - fe effect: show the message

// the aim here is to wrap the Express app in an http server
// to allow this server to handle both normal http requests
// through the express APP but also sockets.

// BEGINNING OF CODE

// we import the express app
const app = require("./app");

// imports needed for socket
const http = require("http");
const { Server } = require("socket.io");

// Then we need to define an in-memory object that holds the rooms objects with their room status
// a room will look like {roomCode: "ABCDE", users: [{uuid:"123456", displayName: "testUser", socketId:"9fvb7on98efG4LNyAABN"}]}
const rooms = {};

// we create an http server that uses our express app for request handling
const server = http.createServer(app);

// then we need to create a servr side socket.io instance bound to this http server
// we call this socket instance io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Set up the sockets events

// you want to define what happens when a client connects to the socket
// to do this you use io.on ("connection", (socket) => {}
// (socket) represents each client connecting each client is given an id

io.on("connection", (socket) => {
  // first thing we log the id of the connetion
  console.log("client connected:", socket.id);

  // then once connected we define what happens
  // when the client emits certain custom events

  // first custom event listener is for create-room, so we say
  // when a connected client emits create-room do something

  socket.on("create-room", ({ displayName }) => {
    // 1) we generate a random room code via a helper function
    const roomCode = generateRoomCode(6);

    // 2) we add a property displayName to the socket client for later use
    socket.displayName = displayName;

    // In socket a "room" is a named group of client sockets managed by the server, so now we need to
    // 3)  add this client a to a named group identified by the roomcode we just generated
    socket.join(roomCode);

    // 4) add this newly generated room to our room global object
    // a room will look like {roomCode: "ABCDE", users: [{uuid:"123456", displayName: "testUser", socketId:"9fvb7on98efG4LNyAABN"}]}
    // N.B. To keep things simple here uiid equals the socket id, but with an actual uuid you'd make a call to the DB to obtain it

    rooms[roomCode] = {
      roomCode,
      users: [{ uuid: socket.id, name: displayName, socketId: socket.id }],
    };

    // 5) Finally we must invoke the custom event room-updated to send the fe the payload (room code and userlist)
    io.to(roomCode).emit("room-updated", {
      roomCode,
      users: rooms[roomCode].users,
    });
  });

  // then we need a listener for when a room is joined by code

  socket.on("join-room", ({ displayName, roomCode }) => {
    // first we check that room exists
    const room = rooms[roomCode];

    if (!room) {
      console.log("Room not found:", roomCode);
      return;
    }

    // then we add property displayName to the socket client
    socket.displayName = displayName;

    // add this client to the room with this roomcode
    socket.join(roomCode);

    // update the list of active users

    room.users.push({
      uuid: socket.id,
      name: displayName,
      socketId: socket.id,
    });

    // finally we emit room-updated so that front-end can update the list of users
    // we use io.to to speak to only a room

    io.to(roomCode).emit("room-updated", {
      roomCode,
      users: rooms[roomCode].users,
    });
  });

  // The we need a listener for when a message is sent by the FE, we receive the roomcode
  // we want to braodcast it back to the room it comes from along some info about the user who sent the messge

  socket.on("send-message", ({ roomCode, message }) => {
    console.log(`got message in ${roomCode}:`, message);
    io.to(roomCode).emit("receive-message", {
      message,
      from: socket.displayName,
      uuid: socket.id,
    });
  });

  // finally we need a custom event when a client disconnects
  // what we need to do here is
  // 1) check all the rooms and remove that socket if present
  // 2) delete the room if the room has become empty as a consequence of this

  socket.on("disconnect", () => {
    // we log what client discounnected
    console.log("client disconnected:", socket.id);

    // then we bascally want to
    // 1) remove the user from every room they were in
    // 2) delete empty rooms
    // 3) notify the remiang users in the room

    // we use Object.entries to turn the rooms object in an array of rooms arrays
    // where index 0 is the key from the object and index 1 is the value from the object
    // so room entries will look like [["ABCDE",{roomCode: "ABCDE", users: [{ uuid: "socket-1", name: "Alice", socketId: "socket-1" },{ uuid: "socket-2", name: "Bob",   socketId: "socket-2"}]}]

    const roomEntries = Object.entries(rooms);

    // we loop over every entry in this array, i.e. loop over every room

    for (let i = 0; i < roomEntries.length; i++) {
      const code = roomEntries[i][0];
      const room = roomEntries[i][1];

      // we keep a record of how many users there are before removing the user
      const originalUserCount = room.users.length;

      // ww build a new array of users that does NOT include this socket that we want to remove
      const remainingUsers = room.users.filter(
        (user) => user.socketId !== socket.id
      );

      // Replace the old users array with the filtered one

      room.users = remainingUsers;

      // Count how many users are left in the room

      const newUserCount = room.users.length;

      // If no users remain, delete the room
      if (newUserCount === 0) {
        delete rooms[code];
        console.log("Deleted empty room:", code);
        continue;
      }

      // If the number of users changed, broadcast updated room state
      if (newUserCount !== originalUserCount) {
        io.to(code).emit("room-updated", {
          roomCode: code,
          users: room.users,
        });
      }
    }
  });
});
// figure out what port to use (eitehr read it from env or defaul locally to 3000)
// then start this http+socket server

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});

// HELPER FUNCTIONS

// generate a random code for the room

function generateRoomCode(codeLength) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < codeLength; i++) {
    // generate a random index between 1 and lenghth of chars so 62.

    const randomIndex = Math.floor(Math.random() * chars.length);

    result += chars.charAt(randomIndex);
  }
  return result;
}
