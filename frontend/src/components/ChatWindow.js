import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";

const ChatWindow = ({ theme }) => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => setSession(data));
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input) {
      return;
    }
    const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setSession((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { role: "user", text: input },
        { role: "bot", text: data.text },
      ],
      table: data.table,
    }));
    setInput("");
  };

  const handleFeedback = (messageIndex, feedback) => {
    console.log("Message Index:", messageIndex, "Feedback:", feedback);
    // Optional: save feedback to backend
  };

  if (!session) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex-1 p-4 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto mb-4">
        {session.messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <p
              className={`inline-block p-2 rounded mb-1 ${
                theme === "dark"
                  ? "bg-gray-200 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {m.text}
            </p>

            {m.role === "bot" && (
              <AnswerFeedback onFeedback={(fb) => handleFeedback(i, fb)} />
            )}
          </div>
        ))}
      </div>

      <TableResponse table={session.table} theme={theme} />

      <div className="flex mt-2">
        <input
          className={`flex-1 text-xl border rounded px-2 py-1 ${
            theme === "dark" ? "bg-white text-black" : "bg-gray-100 text-black"
          }`}
          value={input}
          placeholder="Send Message"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 ml-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
