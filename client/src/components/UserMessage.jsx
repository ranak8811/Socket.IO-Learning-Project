// UserMessage.jsx — Regular chat message with better styling
export default function UserMessage({ msg, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] sm:max-w-xs rounded-lg p-3 ${
          isOwnMessage
            ? "bg-blue-600 rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-blue-400 text-xs font-semibold mb-1">{msg.user}</p>
        )}
        <p className="text-white text-sm">{msg.text}</p>
        <p className="text-xs text-gray-300 opacity-50 mt-1 text-right">
          {msg.time}
        </p>
      </div>
    </div>
  );
}
