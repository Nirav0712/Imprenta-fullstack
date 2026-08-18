import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import http from "http";
import { initSocket } from "./socket.js";

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});