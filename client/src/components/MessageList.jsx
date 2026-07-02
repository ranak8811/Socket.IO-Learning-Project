// MessageList.jsx — Scrollable message area with empty state
import { useEffect, useRef } from "react";
import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";

export default function MessageList({ messages, typingUser, username }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-gray-400 text-lg mb-2">No messages yet!</p>
          <p className="text-gray-500 text-sm">
            Be the first to say something in this room.
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index}>
            {msg.isSystem ? (
              <SystemMessage text={msg.text} />
            ) : (
              <UserMessage msg={msg} isOwnMessage={msg.user === username} />
            )}
          </div>
        ))
      )}

      {typingUser && (
        <div className="text-gray-400 text-sm italic">
          {typingUser} is typing...
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
