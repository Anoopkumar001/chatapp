import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full sm:w-80 flex-shrink-0">
          <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
