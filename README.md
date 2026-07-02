# 🔴 Real-Time Chat App with Socket.IO

A real-time chat application built with React, Node.js, and Socket.IO. Users can join rooms, send messages, see who's online, and get typing indicators — all in real-time.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?style=flat&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)

---

## ✨ Features

- 💬 **Real-Time Messaging** — Send and receive messages instantly
- 👥 **Multiple Chat Rooms** — General, Gaming, Music, Random + custom rooms
- 🟢 **Online User List** — See who's in the room
- ✏️ **Typing Indicator** — Know when someone is typing
- 🔔 **Join/Leave Notifications** — System messages when users join or leave
- 📱 **Responsive Design** — Works on desktop and mobile
- ⚡ **Error Handling** — Connection status and error banners
- 🧩 **Modular Codebase** — Clean component-based architecture

---

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Backend  | Express.js 5, Socket.IO 4        |
| Language | JavaScript (ES Modules)          |

---

## 📁 Project Structure

```
├── client/                          # React Frontend
│   └── src/
│       ├── App.jsx                  # Root component
│       ├── hooks/
│       │   └── useSocket.js         # All socket logic + state
│       ├── components/
│       │   ├── JoinScreen.jsx       # Username input
│       │   ├── RoomSelection.jsx    # Room picker
│       │   ├── ChatScreen.jsx       # Main chat layout
│       │   ├── Sidebar.jsx          # Rooms + online users
│       │   ├── MessageList.jsx      # Messages display
│       │   ├── MessageInput.jsx     # Input form
│       │   ├── SystemMessage.jsx    # Join/leave notifications
│       │   └── UserMessage.jsx      # Chat bubbles
│       └── utils/
│           └── socket.js            # Socket connection
│
├── server/                          # Express Backend
│   └── src/
│       ├── index.js                 # Server setup
│       ├── userManager.js           # User tracking logic
│       └── roomManager.js           # Room management logic

```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ranak8811/Socket.IO-Learning-Project.git
cd Socket.IO-Learning-Project
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Install client dependencies**

```bash
cd ../client
npm install
```

### Running the App

**1. Start the server** (in one terminal)

```bash
cd server
npm run dev
```

Server runs at `http://localhost:5000`

**2. Start the client** (in another terminal)

```bash
cd client
npm run dev
```

Client runs at `http://localhost:5173`

**3. Open the app**

Navigate to `http://localhost:5173` in your browser.

**4. Test multi-user chat**

Open two browser tabs, join with different usernames, select the same room, and start chatting!

---

## 📖 How It Works

### Socket.IO Event Flow

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│                                                         │
│  socket.emit("join room", "General")  ──────────────┐   │
│  socket.emit("room message", data)   ─────────────┐ │   │
│  socket.emit("typing", username)     ───────────┐ │ │   │
│                                                 │ │ │   │
│  socket.on("room message")        ←─────────────┤ │ │   │
│  socket.on("user joined room")     ←────────────┤ │ │   │
│  socket.on("user typing")            ←──────────┤ │ │   │
│                                                 │ │ │   │
├────────────────────────────────────────────     ┼─┼─┼───┤
│                       SERVER                    │ │ │   │
│                                                 │ │ │   │
│  io.to("General").emit(...)         ←───────────┘ │ │   │
│  io.to("General").emit(...)        ←────────────┘ │     │
│  socket.broadcast.emit(...)        ←──────────────┘     │
│                                                         │
└─────────────────────────────────────────────────┘
```

### Key Commands

| Command                   | Target       | Use Case               |
| ------------------------- | ------------ | ---------------------- |
| `socket.emit()`           | Server only  | Send message to server |
| `io.emit()`               | All clients  | Broadcast to everyone  |
| `io.to(room).emit()`      | Room members | Room-specific message  |
| `socket.broadcast.emit()` | Others only  | Typing indicator       |
| `socket.join(room)`       | —            | Join a room            |
| `socket.leave(room)`      | —            | Leave a room           |

---

## 🧩 Architecture

### Modular Design

The codebase follows a modular architecture with clear separation of concerns:

**Server Side:**

- `index.js` — Express + Socket.IO setup (entry point)
- `userManager.js` — User join/leave tracking
- `roomManager.js` — Room join/leave/messaging logic

**Client Side:**

- `App.jsx` — Screen routing (join → room → chat)
- `useSocket.js` — Custom hook with all socket logic
- `components/` — Individual UI components (one per file)

### Custom Hook Pattern

All socket state and logic lives in `useSocket.js`:

```javascript
const {
  isConnected, // Connection status
  messages, // All messages
  onlineUsers, // Users in current room
  typingUser, // Who's typing
  rooms, // Available rooms
  joinChat, // Join with username
  joinRoom, // Switch room
  sendMessage, // Send a message
  startTyping, // Typing indicator
} = useSocket();
```

---

## 🎯 Socket.IO Concepts Learned

| Concept         | What It Means                         |
| --------------- | ------------------------------------- |
| **Emit**        | Send an event with data               |
| **On**          | Listen for an event                   |
| **Broadcast**   | Send to everyone except sender        |
| **Room**        | A named channel for message isolation |
| **Join/Leave**  | Move a socket in/out of a room        |
| **Custom Hook** | Encapsulate logic for reuse           |

---

## 📝 Environment Variables

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `5000`  | Server port |

Create a `.env` file in the `server/` folder:

```env
PORT=5000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Useful Links

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Express.js Documentation](https://expressjs.com/)
