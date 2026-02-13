import { useState, useEffect } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

export default function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleTheme} className="text-2xl text-gray-600 dark:text-gray-300 hover:text-green-400 transition">
      {isDarkMode ? <FaToggleOn /> : <FaToggleOff />}
    </button>
  );
}
