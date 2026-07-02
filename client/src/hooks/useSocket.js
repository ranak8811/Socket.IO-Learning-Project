// useSocket.js — All socket logic and state in one custom hook
import { useEffect, useState, useRef, useCallback } from "react";
import socket from "../utils/socket";

export function useSocket() {
  // ===== STATE =====
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");

  // ===== REFS =====
  const typingTimeoutRef = useRef(null);

  // ===== ACTIONS =====
  const joinChat = useCallback((name) => {
    if (name.trim() === "") return;
    setUsername(name);
    setIsJoined(true);
    socket.emit("user join", name);
  }, []);

  const joinRoom = useCallback((roomName) => {
    if (roomName.trim() === "") return;
    setCurrentRoom(roomName);
    socket.emit("join room", roomName);
  }, []);

  const sendMessage = useCallback((text) => {
    if (text.trim() === "" || !currentRoom) return;

    socket.emit("room message", {
      text: text,
      user: username,
      room: currentRoom,
      time: new Date().toLocaleTimeString(),
    });
    socket.emit("stop typing", username);
  }, [currentRoom, username]);

  const startTyping = useCallback(() => {
    socket.emit("typing", username);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", username);
    }, 2000);
  }, [username]);

  // ===== EFFECTS =====
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user joined room", (data) => {
      setOnlineUsers(data.users || []);
      setRooms(data.rooms || []);
      setMessages((prev) => [
        ...prev,
        {
          text: `${data.username} joined the room`,
          user: "System",
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        },
      ]);
    });

    socket.on("user left room", (data) => {
      setOnlineUsers(data.users || []);
      setRooms(data.rooms || []);
      setMessages((prev) => [
        ...prev,
        {
          text: `${data.username} left the room`,
          user: "System",
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        },
      ]);
    });

    socket.on("user typing", (name) => {
      setTypingUser(name);
    });

    socket.on("user stopped typing", () => {
      setTypingUser(null);
    });

    socket.on("rooms list", (roomList) => {
      setRooms(roomList);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room message");
      socket.off("user joined room");
      socket.off("user left room");
      socket.off("user typing");
      socket.off("user stopped typing");
      socket.off("rooms list");
    };
  }, []);

  return {
    // State
    isConnected,
    messages,
    onlineUsers,
    typingUser,
    rooms,
    username,
    isJoined,
    currentRoom,
    // Actions
    joinChat,
    joinRoom,
    sendMessage,
    startTyping,
  };
}
