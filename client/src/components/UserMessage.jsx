// UserMessage.jsx — Regular chat message
export default function UserMessage({ msg, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg p-3 ${
          isOwnMessage ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-blue-400 text-sm font-semibold">{msg.user}</p>
        )}
        <p className="text-white">{msg.text}</p>
        <p className="text-xs text-gray-300 opacity-50 mt-1">{msg.time}</p>
      </div>
    </div>
  );
}
