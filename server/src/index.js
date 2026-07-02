// index.js - মেইন ফাইল
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { setupUserHandlers } from "./userManager.js";

// ===== ১. এক্সপোর্ট করা ফাংশন =====
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// ===== ৪. সার্ভার তৈরি =====
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ===== ৮. সার্ভার চালু করুন =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

// ===== ৯. ব্যবহার ফাংশন কল করুন =====
setupUserHandlers(io); // ✅ এই লাইনটি নতুন ফাইলে আছে
