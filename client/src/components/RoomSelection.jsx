// RoomSelection.jsx — Room picker with better UI
import { useState } from "react";

export default function RoomSelection({ onJoinRoom }) {
  const [newRoom, setNewRoom] = useState("");

  const handleCreate = () => {
    if (newRoom.trim() === "") return;
    onJoinRoom(newRoom);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  const roomEmojis = {
    General: "💬",
    Gaming: "🎮",
    Music: "🎵",
    Random: "🎲",
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Select a Room</h1>
          <p className="text-gray-400 text-sm">
            Choose a room or create your own
          </p>
        </div>

        {/* Predefined rooms */}
        <div className="space-y-3 mb-6">
          {["General", "Gaming", "Music", "Random"].map((room) => (
            <button
              key={room}
              onClick={() => onJoinRoom(room)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition text-left flex items-center gap-3"
            >
              <span className="text-xl">{roomEmojis[room]}</span>
              <span className="font-medium">{room}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Custom room */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Create a custom room..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreate}
            disabled={newRoom.trim() === ""}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
