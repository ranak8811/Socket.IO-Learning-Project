// MessageInput.jsx — Message input with Enter key support
import { useState } from "react";

export default function MessageInput({ currentRoom, onSend, onTyping }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    onSend(inputMessage);
    setInputMessage("");
  };

  const handleChange = (e) => {
    setInputMessage(e.target.value);
    onTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={handleChange}
          placeholder={`Message #${currentRoom}...`}
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          disabled={inputMessage.trim() === ""}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Send
        </button>
      </div>
    </form>
  );
}
