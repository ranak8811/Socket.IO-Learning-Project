// Sidebar.jsx — Rooms list + Online users
export default function Sidebar({
  rooms,
  currentRoom,
  onlineUsers,
  onJoinRoom,
}) {
  return (
    <div className="w-64 border-r border-gray-700 p-4">
      {/* Rooms list */}
      <h2 className="text-white font-bold mb-4">Rooms ({rooms?.length})</h2>
      <div className="space-y-2 mb-6">
        {rooms.map((room, index) => (
          <button
            key={index}
            onClick={() => onJoinRoom(room)}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              currentRoom === room
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Online users list */}
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
  );
}
