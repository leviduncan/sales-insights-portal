import { useState, useEffect } from "react";

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
    <button
      className="bg-green-500 text-white p-2 rounded-full"
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}
