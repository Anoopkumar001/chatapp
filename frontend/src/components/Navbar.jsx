import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { MessageSquare, LogOut, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuth();
  const { darkMode, toggleDarkMode, accent, setAccent, accentThemes } = useTheme();

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-lg">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-100">ChatApp</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Accent color picker */}
        <div className="hidden sm:flex items-center gap-1.5">
          {accentThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setAccent(theme.name)}
              title={theme.name}
              className={`w-5 h-5 rounded-full transition ${
                accent === theme.name
                  ? "ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-800"
                  : ""
              }`}
              style={{ backgroundColor: theme.color }}
            />
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {authUser && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:block">
              Hi, {authUser.fullName}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
