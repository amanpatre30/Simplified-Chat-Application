import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sessions, theme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const newChat = async () => {
    const res = await fetch("http://localhost:5000/api/new-chat");
    const data = await res.json();
    navigate(`/chat/${data.id}`);
  };

  // Sidebar background
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  // Heading color
  const headingText = theme === "dark" ? "text-white" : "text-gray-800";
  // Session items background and hover
  const itemBg =
    theme === "dark"
      ? "bg-gray-700 hover:bg-gray-600"
      : "bg-gray-200 hover:bg-gray-300";
  // Session items text color
  const itemText =
    theme === "dark"
      ? "text-white font-semibold"
      : "text-gray-800 font-semibold";

  return (
    <div
      className={`transition-all duration-300 h-screen overflow-y-auto ${
        collapsed ? "w-16" : "w-64"
      } ${bgColor}`}
    >
      <div className={`flex justify-between items-center p-2 ${headingText}`}>
        {!collapsed && <h2 className="text-lg font-bold">Sessions</h2>}
        <button
          className={`px-2 py-1 rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {!collapsed && (
        <div className="p-2">
          <button
            onClick={newChat}
            className={`w-full mb-4 px-3 py-1 rounded ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            New Chat
          </button>

          {sessions.map((s) => (
            <div
              key={s.id}
              className={`p-2 mb-2 rounded cursor-pointer ${itemBg} ${itemText}`}
              onClick={() => navigate(`/chat/${s.id}`)}
            >
              {s.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
