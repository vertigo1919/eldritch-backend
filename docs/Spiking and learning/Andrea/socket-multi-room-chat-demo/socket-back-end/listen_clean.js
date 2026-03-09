const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");

const rooms = {};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);

  socket.on("create-room", ({ displayName }) => {
    const roomCode = generateRoomCode(6);

    socket.displayName = displayName;

    socket.join(roomCode);

    rooms[roomCode] = {
      roomCode,
      users: [{ uuid: socket.id, name: displayName, socketId: socket.id }],
    };

    io.to(roomCode).emit("room-updated", {
      roomCode,
      users: rooms[roomCode].users,
    });
  });

  socket.on("join-room", ({ displayName, roomCode }) => {
    const room = rooms[roomCode];

    if (!room) {
      console.log("Room not found:", roomCode);
      return;
    }

    socket.displayName = displayName;

    socket.join(roomCode);

    room.users.push({
      uuid: socket.id,
      name: displayName,
      socketId: socket.id,
    });

    io.to(roomCode).emit("room-updated", {
      roomCode,
      users: rooms[roomCode].users,
    });
  });

  socket.on("send-message", ({ roomCode, message }) => {
    console.log(`got message in ${roomCode}:`, message);
    io.to(roomCode).emit("receive-message", {
      message,
      from: socket.displayName,
      uuid: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);

    const roomEntries = Object.entries(rooms);

    for (let i = 0; i < roomEntries.length; i++) {
      const code = roomEntries[i][0];
      const room = roomEntries[i][1];

      const originalUserCount = room.users.length;

      const remainingUsers = room.users.filter(
        (user) => user.socketId !== socket.id
      );

      room.users = remainingUsers;

      const newUserCount = room.users.length;

      if (newUserCount === 0) {
        delete rooms[code];
        console.log("Deleted empty room:", code);
        continue;
      }

      if (newUserCount !== originalUserCount) {
        io.to(code).emit("room-updated", {
          roomCode: code,
          users: room.users,
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});

function generateRoomCode(codeLength) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);

    result += chars.charAt(randomIndex);
  }
  return result;
}
