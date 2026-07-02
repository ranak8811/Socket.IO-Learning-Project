// ===== ১. Package Import =====
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// ===== ২. Express App তৈরি =====
const app = express();

// ===== ৩. CORS Configuration =====
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

// ===== ৪. HTTP Server তৈরি =====
const server = createServer(app);

// ===== ৫. Socket.IO Server তৈরি =====
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ===== ৬. Socket.IO Connection Handler =====
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ===== ৭. Server Start =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
