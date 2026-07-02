// App.jsx - Modular Style
import { useEffect, useState, useRef } from "react";
import socket from "./utils/socket";

const App = () => {
  // ===== STATE =====
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  // ===== REFS =====
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ===== FUNCTIONS =====
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Join chat
  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() === "") return;
    setIsJoined(true);
    socket.emit("user join", username);
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const messageData = {
      text: inputMessage,
      user: username,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("chat message", messageData);
    socket.emit("stop typing", username);
    setInputMessage("");
  };

  // Handle input change (typing indicator)
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    socket.emit("typing", username);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", username);
    }, 2000);
  };

  // ===== SIDE EFFECTS =====
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user joined", (data) => {
      setOnlineUsers(data.users);
      setMessages((prev) => [
        ...prev,
        {
          text: data.username + " joined the chat",
          user: "System",
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        },
      ]);
    });

    socket.on("user left", (data) => {
      setOnlineUsers(data.users);
      setMessages((prev) => [
        ...prev,
        {
          text: data.username + " left the chat",
          user: "System",
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        },
      ]);
    });

    socket.on("user typing", (name) => {
      setTypingUser(name);
    });

    socket.on("user stopped typing", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.off("user joined");
      socket.off("user left");
      socket.off("user typing");
      socket.off("user stopped typing");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===== JOIN SCREEN =====
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Socket.IO Chat
          </h1>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition font-semibold"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== CHAT SCREEN =====
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl h-150 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-700 p-4">
          <h2 className="text-white font-bold mb-4">
            Online ({onlineUsers.length})
          </h2>
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">Chat Room</h1>
            <span className="text-gray-400 text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.isSystem ? (
                  <div className="text-center">
                    <span className="text-gray-500 text-sm bg-gray-700 px-3 py-1 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <div className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs rounded-lg p-3 ${msg.user === username ? "bg-blue-600" : "bg-gray-700"}`}>
                      {msg.user !== username && (
                        <p className="text-blue-400 text-sm font-semibold">{msg.user}</p>
                      )}
                      <p className="text-white">{msg.text}</p>
                      <p className="text-xs text-gray-300 opacity-50 mt-1">{msg.time}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typingUser && (
              <div className="text-gray-400 text-sm italic">
                {typingUser} is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;