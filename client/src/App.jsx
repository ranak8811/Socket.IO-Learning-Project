// App.jsx — Root component
import { useSocket } from "./hooks/useSocket";
import JoinScreen from "./components/JoinScreen";
import RoomSelection from "./components/RoomSelection";
import ChatScreen from "./components/ChatScreen";

const App = () => {
  const {
    isConnected,
    messages,
    onlineUsers,
    typingUser,
    rooms,
    username,
    isJoined,
    currentRoom,
    error,
    isLoading,
    joinChat,
    joinRoom,
    sendMessage,
    startTyping,
  } = useSocket();

  return (
    <>
      {/* Error Banner */}
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50 text-sm">
          {error}
        </div>
      )}

      {/* Screen 1: Username input */}
      {!isJoined && <JoinScreen onJoin={joinChat} isLoading={isLoading} />}

      {/* Screen 2: Room selection */}
      {isJoined && !currentRoom && <RoomSelection onJoinRoom={joinRoom} />}

      {/* Screen 3: Chat */}
      {isJoined && currentRoom && (
        <ChatScreen
          isConnected={isConnected}
          currentRoom={currentRoom}
          rooms={rooms}
          onlineUsers={onlineUsers}
          messages={messages}
          typingUser={typingUser}
          username={username}
          onJoinRoom={joinRoom}
          onSendMessage={sendMessage}
          onTyping={startTyping}
        />
      )}
    </>
  );
};

export default App;
