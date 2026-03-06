# Socket Multi-Room Chat Demo

Simple multi-room chat app with a Node/Express + Socket.IO backend and a React + Vite frontend.
It has three phases: **joining**, **lobby**, and **chatting**.
See extensive comments for how it works.

## 1. Backend (socket-back-end)

### Install

```bash
cd socket-back-end
npm install
```

### Run

```bash
npm run dev
```

This starts the Express + Socket.IO server on `http://localhost:3000`. It exposes:

- Socket events: `create-room`, `join-room`, `send-message`, `room-updated`, `receive-message`

## 2. Frontend (socket-frontend)

### Install

```bash
cd socket-frontend
npm install
```

### Run

```bash
npm run dev
```

Vite will print a local URL `http://localhost:5173`.

## 3. Usage

Open the frontend on multiple browser tabs and try creating rooms, joining rooms, and chatting.
