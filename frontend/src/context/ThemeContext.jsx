import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Available accent color themes — must match the data-theme selectors in index.css
export const ACCENT_THEMES = [
  { name: "indigo", color: "#6366f1" },
  { name: "teal", color: "#14b8a6" },
  { name: "rose", color: "#f43f5e" },
  { name: "amber", color: "#f59e0b" },
];

export const ThemeProvider = ({ children }) => {
  // Dark mode: check localStorage first, otherwise fall back to system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [accent, setAccent] = useState(() => localStorage.getItem("accentTheme") || "indigo");

  // Toggle the "dark" class on <html> — Tailwind's darkMode:"class" reads this
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Set data-theme on <html> — index.css swaps the --color-primary variable based on this
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", accent);
    localStorage.setItem("accentTheme", accent);
  }, [accent]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, accent, setAccent, accentThemes: ACCENT_THEMES }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
