import React from "react";

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="p-2">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="bg-gray-300 dark:bg-gray-700 dark:text-white px-3 py-1 rounded"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;
