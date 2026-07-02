// userManager.js - ইউজার ম্যানেজমেন্ট ফাংশন
const users = {}; // socket.id → username ম্যাপ

export function setupUserHandlers(io) {
  io.on("connection", (socket) => {
    // ১. user join হ্যান্ডলার
    socket.on("user join", (username) => {
      users[socket.id] = username;
      console.log(`${username} joined the chat`);

      // সবাইকে জানান
      io.emit("user joined", {
        username: username,
        users: Object.values(users),
      });
    });

    // ===== NEW: চ্যাট মেসেজ হ্যান্ডেলার =====
    socket.on("chat message", (data) => {
      console.log(`[${data.user}] ${data.text}`);
      io.emit("chat message", data);
    });

    // ===== NEW: টাইপিং ইভেন্ট =====
    socket.on("typing", (username) => {
      socket.broadcast.emit("user typing", username);
    });

    socket.on("stop typing", () => {
      socket.broadcast.emit("user stopped typing");
    });

    // ===== NEW: ডিসকানেকশন হ্যান্ডলার =====
    socket.on("disconnect", () => {
      if (users[socket.id]) {
        const username = users[socket.id];
        delete users[socket.id];
        console.log(`${username} left the chat`);

        io.emit("user left", {
          username: username,
          users: Object.values(users),
        });
      }
    });
  });
}
