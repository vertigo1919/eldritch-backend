import 'dotenv/config';
import http from 'http';
import { app } from './app.js';
import { loadSocketHandlers } from './sockets/index.js';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('client connected:', socket.id);

  loadSocketHandlers(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
