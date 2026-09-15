import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io(SOCKET_URL, {
      query: { userId: authUser._id },
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 socket connected:", socket.id); // temporary debug line
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("📡 getOnlineUsers received:", userIds); // temporary debug line
      setOnlineUsers(userIds);
    });

    return () => {
      socket.disconnect();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};