// Sidebar.jsx — Rooms list + Online users with better styling
export default function Sidebar({
  rooms,
  currentRoom,
  onlineUsers,
  onJoinRoom,
}) {
  return (
    <div className="w-64 border-r border-gray-700 p-4 bg-gray-800 h-full">
      {/* Rooms list */}
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
        Rooms ({rooms?.length || 0})
      </h2>
      <div className="space-y-1 mb-6">
        {(rooms || []).map((room, index) => (
          <button
            key={index}
            onClick={() => onJoinRoom(room)}
            className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
              currentRoom === room
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            # {room}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 mb-6" />

      {/* Online users list */}
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
        Online — {onlineUsers.length}
      </h2>
      <div className="space-y-2">
        {onlineUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-300 text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="truncate">{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
