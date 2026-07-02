import { useEffect, useState } from "react";
import socket from "./utils/socket";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      setSocketId(socket.id);
      console.log("Connected! Socket ID:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocketId("");
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Socket.IO Chat
        </h1>

        <div className="space-y-4">
          {/* কানেকশন স্ট্যাটাস */}
          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}
            ></div>
            <span className="text-white">
              {isConnected ? "Connected to Server" : "Disconnected"}
            </span>
          </div>

          {/* Socket ID */}
          {socketId && (
            <div className="p-4 bg-gray-700 rounded-lg">
              <span className="text-gray-400 text-sm">Your Socket ID:</span>
              <p className="text-green-400 font-mono text-sm mt-1 break-all">
                {socketId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
