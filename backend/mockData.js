let sessions = [
  {
    id: "1",
    title: "Welcome Session",
    messages: [
      { role: "user", text: "Hello" },
      { role: "bot", text: "Hi! How can I assist you today?" },
    ],
    table: [
      { key: "Name", value: "Alice" },
      { key: "Age", value: 25 },
    ],
  },
];

module.exports = { sessions };
