import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function ChatTest() {
  const [phase, setPhase] = useState('joining');

  const [displayName, setDisplayName] = useState('');

  const [roomCode, setRoomCode] = useState('');

  const [users, setUsers] = useState([]);

  const [inputMessage, setInputMessage] = useState('');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected:', socket.id);
    });

    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('room-updated', (payload) => {
      setRoomCode(payload.roomCode);
      setUsers(payload.users);
      setPhase('lobby');
    });

    return () => {
      socket.off('receive-message');
      socket.off('connect');
      socket.off('room-updated');
    };
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    socket.emit('send-message', {
      roomCode,
      message: inputMessage,
    });

    setInputMessage('');
  };

  const handleJoinRoomSubmit = (e) => {
    e.preventDefault();
    if (!displayName.trim() || !roomCode.trim()) return;
    socket.emit('join-room', { displayName, roomCode });
  };

  const handleCreateRoomSubmit = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    socket.emit('create-room', { displayName });
  };

  return (
    <>
      {phase === 'joining' && (
        <div>
          <h1> Phase: Joining </h1>

          <form onSubmit={handleCreateRoomSubmit}>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <button type="submit">Create New Room</button>
          </form>

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
      {phase === 'lobby' && (
        <div>
          <h1> Phase: Lobby </h1>
          <p>Room code: {roomCode}</p>
          <h2>Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u.uuid}>{u.name}</li>
            ))}
          </ul>
          <button onClick={() => setPhase('chatting')}>Go to chat</button>
        </div>
      )}
      {phase === 'chatting' && (
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
