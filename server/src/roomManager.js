import { users } from "./userManager.js";

const rooms = {};

function getRoomUsers(roomName) {
  return (rooms[roomName] || []).map((id) => users[id]).filter(Boolean);
}

export function setupRoomHandlers(io) {
  io.on("connection", (socket) => {
    socket.on("join room", (roomName) => {
      if (socket.room) {
        socket.leave(socket.room);
        rooms[socket.room] = rooms[socket.room].filter(
          (id) => id !== socket.id,
        );

        io.to(socket.room).emit("user left room", {
          username: users[socket.id],
          uesrs: getRoomUsers(socket.room),
        });
      }

      socket.join(roomName);
      socket.room = roomName;

      if (!rooms[roomName]) {
        rooms[roomName] = [];
      }

      rooms[roomName].push(socket.id);

      console.log(`User joined room: ${roomName}`);

      io.to(roomName).emit("user joined room", {
        username: users[socket.id],
        users: getRoomUsers(roomName),
        rooms: Object.keys(rooms),
      });
    });

    socket.on("room message", (data) => {
      io.to(data.room).emit("room message", {
        text: data.text,
        user: users[socket.id],
        room: data.room,
        time: new Date().toLocaleTimeString(),
      });
    });

    socket.on("get rooms", () => {
      socket.emit("room list", Object.keys(rooms));
    });
  });
}
