const express = require("express");
const cors = require("cors");
const { sessions } = require("./mockData");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all sessions
app.get("/api/sessions", (req, res) => {
  const list = sessions.map((s) => ({ id: s.id, title: s.title }));
  res.json(list);
});

// Create new chat
app.get("/api/new-chat", (req, res) => {
  const newId = (sessions.length + 1).toString();
  const newSession = {
    id: newId,
    title: `Session ${newId}`,
    messages: [],
    table: [],
  };
  sessions.push(newSession);
  res.json({ id: newId });
});

// Get session by ID
app.get("/api/session/:id", (req, res) => {
  const session = sessions.find((s) => s.id === req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

// Send message
app.post("/api/chat/:id", (req, res) => {
  const session = sessions.find((s) => s.id === req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const { message } = req.body;
  const botReply = `Bot received: "${message}"`;
  session.messages.push({ role: "user", text: message });
  session.messages.push({ role: "bot", text: botReply });

  const table = [
    { key: "Message Length", value: botReply.length },
    { key: "Total Messages", value: session.messages.length },
  ];
  session.table = table;

  res.json({ text: botReply, table });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
