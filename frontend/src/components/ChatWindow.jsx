import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { MessageSquare } from "lucide-react";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuth();
  const { socket, onlineUsers } = useSocket();
  const bottomRef = useRef(null);

  // Fetch message history when a user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/messages/${selectedUser._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error.message);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  // Listen for real-time incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const isRelevant =
        newMessage.senderId === selectedUser?._id ||
        newMessage.receiverId === selectedUser?._id;
      if (isRelevant) setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text) => {
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, { text });
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      console.log("Error sending message:", error.message);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900">
        <MessageSquare className="w-14 h-14 mb-3" />
        <p className="text-lg font-medium">Select a contact to start chatting</p>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
          {selectedUser.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.fullName}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scroll p-4">
        {messages.length === 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-6">
            No messages yet. Say hi 👋
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwnMessage={msg.senderId === authUser._id}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
