// ChatScreen.jsx — Main chat layout with sidebar
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
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl h-150 flex">
        {/* Sidebar */}
        <Sidebar
          rooms={rooms}
          currentRoom={currentRoom}
          onlineUsers={onlineUsers}
          onJoinRoom={onJoinRoom}
        />

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">#{currentRoom}</h1>
            <span className="text-gray-400 text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
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
