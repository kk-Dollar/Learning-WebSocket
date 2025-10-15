# Learning-WebSocket

A small real-time React + Socket.IO example showing how to publish player names and scores and broadcast updates to connected clients.

This repository contains two folders:

- `client/` — Vite + React client application
- `server/` — Node.js Socket.IO server

## What it does

- Clients submit a player's name and score.
- Server stores submitted scores in memory and broadcasts the updated player list to all connected clients.
- Clients show the list in a table with edit and delete controls.

> Note: This is a learning/demo project. The server stores data in memory and is not production-ready.

## Environment variables

Two `.env` files are used for local development (these are ignored by git):

- `client/.env` (Vite client; client-exposed variables must start with `VITE_`)
  - `VITE_SOCKET_URL` — URL for the socket server (e.g. `http://localhost:3000`)
  - `VITE_API_URL` — (optional) API base URL if needed
  - `VITE_APP_CLIENT_ID` — Example client id placeholder

- `server/.env`
  - `PORT` — port the server listens on (default: 3000)
  - Add other service keys here (DB URI, JWT secret) as needed — do not commit secrets.

A `.env.example` file exists in both `client/` and `server/` with example names to commit safely.

## How to run locally

Prerequisites:
- Node.js 18+ (or matching your project's node version)
- npm

1. Install dependencies

```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

2. Start the server

```bash
# from server folder
node server.js
# or during development
npx nodemon server.js
```

3. Start the client

```bash
# from client folder
npm run dev
```

4. Open the Vite URL shown in the terminal (usually http://localhost:5173). Submit a name and score and click Publish Score — the server will broadcast the updated list to all connected clients.

## Implementation notes & gotchas

- The server stores `playerScores` in memory. Restarting the server clears data.
- In development React Strict Mode may mount components twice; ensure you wire socket setup and emits inside `useEffect` and guard duplicate emits if necessary.
- Client-exposed env variables must begin with `VITE_`.
- Do not commit `.env` files. Use the `.env.example` files for documentation.

## Suggested improvements

- Persist scores to a database (MongoDB, PostgreSQL).
- Add authentication and validation.
- Add server-side rate-limiting to avoid spammed emits.
- Add unit and integration tests.

## License

This repository is provided as-is for learning purposes.
