// App.jsx — Root component using modular components + custom hook
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
    joinChat,
    joinRoom,
    sendMessage,
    startTyping,
  } = useSocket();

  // Screen 1: Username input
  if (!isJoined) {
    return <JoinScreen onJoin={joinChat} />;
  }

  // Screen 2: Room selection
  if (!currentRoom) {
    return <RoomSelection onJoinRoom={joinRoom} />;
  }

  // Screen 3: Chat
  return (
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
  );
};

export default App;
