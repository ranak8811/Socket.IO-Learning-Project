import { useEffect, useState } from "react";
import socket from "./utils/socket";
import { useRef } from "react";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      setSocketId(socket.id);
      console.log("Connected! Socket ID:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocketId("");
      console.log("Disconnected from server");
    });

    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;

    const messageData = {
      text: inputMessage,
      user: "You",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("chat message", messageData);

    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white text-center">
            Socket.IO Chat
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <span className="text-gray-400 text-sm">
              {isConnected ? `Connected (${socketId})` : "Disconnected"}
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
              No messages yet. Say hello!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-semibold text-sm">
                    {msg.user}
                  </span>
                  <span className="text-gray-500 text-xs">{msg.time}</span>
                </div>
                <p className="text-white mt-1">{msg.text}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
