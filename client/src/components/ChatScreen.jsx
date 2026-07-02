// ChatScreen.jsx — Main chat layout with responsive sidebar
import { useState } from "react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatScreen({
  isConnected,
  currentRoom,
  rooms,
  onlineUsers,
  messages,
  typingUser,
  username,
  onJoinRoom,
  onSendMessage,
  onTyping,
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl h-[90vh] sm:h-150 flex relative">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="sm:hidden absolute top-3 left-3 z-20 bg-gray-700 text-white p-2 rounded-lg"
        >
          {showSidebar ? "✕" : "☰"}
        </button>

        {/* Sidebar — hidden on mobile, toggle with button */}
        <div
          className={`
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
            absolute sm:relative
            z-10 sm:z-auto
            h-full
            transition-transform duration-300
          `}
        >
          <Sidebar
            rooms={rooms}
            currentRoom={currentRoom}
            onlineUsers={onlineUsers}
            onJoinRoom={(room) => {
              onJoinRoom(room);
              setShowSidebar(false);
            }}
          />
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center gap-3">
            <span className="text-gray-400 text-xl sm:hidden">
              #{currentRoom}
            </span>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              #{currentRoom}
            </h1>
            <div className="flex items-center gap-2 ml-auto">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <span className="text-gray-400 text-sm">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          {/* Messages */}
          <MessageList
            messages={messages}
            typingUser={typingUser}
            username={username}
          />

          {/* Input */}
          <MessageInput
            currentRoom={currentRoom}
            onSend={onSendMessage}
            onTyping={onTyping}
          />
        </div>
      </div>
    </div>
  );
}
