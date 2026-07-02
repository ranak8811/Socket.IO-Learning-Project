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

const users = {};

// ===== ৬. Socket.IO Connection Handler =====
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("user join", (username) => {
    users[socket.id] = username;

    console.log(username + " joined the chat");

    io.emit("user joined", {
      username: username,
      users: Object.values(users),
    });
  });

  socket.on("chat message", (data) => {
    console.log("Message from " + data.user + ":", data.text);

    io.emit("chat message", data);
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("user typing", username);
  });

  socket.on("stop typing", (username) => {
    socket.broadcast.emit("user stopped typing", username);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];

    if (username) {
      console.log(username + " left the chat");

      delete users[socket.id];

      io.emit("user left", {
        username: username,
        users: Object.values(users),
      });
    }
  });
});

// ===== ৭. Server Start =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
