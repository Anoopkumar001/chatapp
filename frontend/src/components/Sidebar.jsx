import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useSocket } from "../context/SocketContext";
import { Users } from "lucide-react";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/messages/users");
        setUsers(res.data);
      } catch (error) {
        console.log("Error fetching users:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <aside className="h-full w-full border-r border-slate-200 dark:border-slate-700 flex flex-col bg-white dark:bg-slate-800">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <span className="font-semibold text-slate-700 dark:text-slate-200">Contacts</span>
      </div>

      <div className="overflow-y-auto chat-scroll flex-1">
        {isLoading && (
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-4">Loading...</p>
        )}

        {!isLoading && users.length === 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-4">No contacts yet</p>
        )}

        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition text-left ${
                selectedUser?._id === user._id ? "bg-indigo-50 dark:bg-slate-700" : ""
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 dark:text-slate-100 truncate">{user.fullName}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{isOnline ? "Online" : "Offline"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
