import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [sessions, setSessions] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar sessions={sessions} theme={theme} />
        <div className="flex-1 flex flex-col">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <Routes>
            <Route
              path="/chat/:sessionId"
              element={<ChatWindow theme={theme} />}
            />
            <Route
              path="/"
              element={
                <div className="flex-1 flex items-center justify-center text-gray-700 dark:text-white">
                  Select or start a new chat
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
