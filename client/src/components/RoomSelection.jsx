// RoomSelection.jsx — Room picker screen
import { useState } from "react";

export default function RoomSelection({ onJoinRoom }) {
  const [newRoom, setNewRoom] = useState("");

  const handleCreate = () => {
    if (newRoom.trim() === "") return;
    onJoinRoom(newRoom);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Select a Room
        </h1>

        {/* Predefined rooms */}
        <div className="space-y-3 mb-6">
          {["General", "Gaming", "Music", "Random"].map((room) => (
            <button
              key={room}
              onClick={() => onJoinRoom(room)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition text-left"
            >
              {room}
            </button>
          ))}
        </div>

        {/* Custom room */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="Or create a new room..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
