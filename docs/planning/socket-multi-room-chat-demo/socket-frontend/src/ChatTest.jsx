// We are creating a room based chat app
// it will have 3 screens rendered conditionally based on the phase
// 1 Joining: a user must input their disaply name and then either click on create room or join one via code
// 2 Lobby: we display users connected and a button to start chatting
// 3 Chatting: simple send a message that's shown to all clients connected in the room

// First let's define the socket event schema

// CLIENT TO SERVER EVENTS

// create-room:
// - when a user clicks on create room
// - payload: {displyName: "TestUser"}
// - server action: create a code, join socket to the room with that code, build users array
// - room-updated

// join-room:
// - when a user cliks on join room
// - payload: {displyName: "TestUser", roomCode: "ABCDE"}
// - server action: check room exists, join socket to the room with that code, build users list

// send-message:
// - when a user clicks on send message
// - payload {message: "This is a test message"}
// - server action: the server broadcasts it to all users in the room emitting receive-message

// SERVER TO CLIENT EVENTS

// room-updated
// - when the server detects a new user (following create-room or join-room)
// - payload: { roomCode: "ABCDE", users: [ { userId: "uuid-1", name: "Alice" },{ userId: "uuid-2", name: "Bob" }]}
// - fe effect: make sure to render lobby phase and show room code and list of connected users

// receive-message
// - when the server receives a message from a client (following send-message)
// - payload: {message: "This is a test message", from: "sender display name", uiid: socket.id }
// - fe effect: show the message

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// we create a socket connection to the server
// for simplicty we create it here but best practice is either to
// A) Create it ann export it in a seprate socket.js file
// B) Creata a custom hook that returns it
const socket = io("http://localhost:3000");

export default function ChatTest() {
  // add a state to hold the "phase" of the app for conditional rendering: 1 "joining" 2 "lobby" 3"chatting"

  const [phase, setPhase] = useState("joining");

  // add state for display Name in joining screen gets used
  const [displayName, setDisplayName] = useState("");

  // add a state for the roomCode
  const [roomCode, setRoomCode] = useState("");

  // add a state to keep track of connected users
  const [users, setUsers] = useState([]);

  // we create a state for chat message typed by the user
  const [inputMessage, setInputMessage] = useState("");

  // and a state for the messages received by the socket backend
  const [messages, setMessages] = useState([]);

  // then we use useEffect to listen to all custom events from backend
  useEffect(() => {
    // Subscribes to the "connect" event of the socket
    // if successful it logs it
    socket.on("connect", () => {
      console.log("connected:", socket.id);
    });

    //Subscribes to the custom "receive-message" event we defined
    // in the backend which broacast whatever the backend receives
    // to the front end via this socket
    // when this happens this callback is then run which
    // adds the message to the message status
    // and ret
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // we also must lisntn to room-updated
    socket.on("room-updated", (payload) => {
      setRoomCode(payload.roomCode);
      setUsers(payload.users);
      setPhase("lobby");
    });

    // here we define the function that runs on unmounting
    // of this component

    // Here we define what happens when the component unmounts
    //  we remove the sockets in order to avoid memory leaks
    return () => {
      socket.off("receive-message");
      socket.off("connect");
      socket.off("room-updated");
    };
  }, []);

  // Handling functions for forms
  const handleMessageSubmit = (e) => {
    //we stop the browser default behaviour on click
    e.preventDefault();

    // we prevent empty submission
    if (!inputMessage.trim()) return;

    // we send the message via socket to the server as an object
    socket.emit("send-message", {
      roomCode,
      message: inputMessage,
    });

    // we clear the form
    setInputMessage("");
  };

  const handleJoinRoomSubmit = (e) => {
    //we stop the browser default behaviour on click
    e.preventDefault();
    // if display name or room code we want to exit
    if (!displayName.trim() || !roomCode.trim()) return;
    // we emit join-room to intiate backend logic
    socket.emit("join-room", { displayName, roomCode });
  };

  const handleCreateRoomSubmit = (e) => {
    //we stop the browser default behaviour on click
    e.preventDefault();
    // if display name is empty we want nothing to happen
    if (!displayName.trim()) return;
    // we emit create-room to intiate backend logic
    socket.emit("create-room", { displayName });
  };

  return (
    <>
      {/* PHASE 1: JOINING */}
      {phase === "joining" && (
        <div>
          <h1> Phase: Joining </h1>

          {/* CREATE A ROOM FORM */}
          <form onSubmit={handleCreateRoomSubmit}>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <button type="submit">Create New Room</button>
          </form>

          {/* JOIN A ROOM FORM */}
          <form onSubmit={handleJoinRoomSubmit}>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Room Coode"
            />

            <button type="submit">Join Room</button>
          </form>
        </div>
      )}
      {/* PHASE 2: LOBBY */}
      {phase === "lobby" && (
        <div>
          <h1> Phase: Lobby </h1>
          <p>Room code: {roomCode}</p>
          <h2>Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u.uuid}>{u.name}</li>
            ))}
          </ul>
          <button onClick={() => setPhase("chatting")}>Go to chat</button>
        </div>
      )}
      {/* PHASE 3: CHATTING */}
      {phase === "chatting" && (
        <div>
          <h1>Socket Room Chat Test</h1>
          <h2>Room Code:{roomCode}</h2>
          <form onSubmit={handleMessageSubmit}>
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type message..."
            />
            <button type="submit">Send</button>
          </form>

          {/* we map over the array to print the messages 
        we use the array index (i) as the react key */}

          <ul>
            {messages.map((m, i) => (
              <li key={i}>
                <strong>{m.from}</strong>: {m.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
