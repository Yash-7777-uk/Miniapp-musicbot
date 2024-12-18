const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy Database (Replace with MongoDB or MySQL)
const rooms = {}; // { room_id: { users: [{ user_id, name }] } }

app.use(express.json());
app.use(express.static("public"));

// API to join a room
app.get("/api/join-room", (req, res) => {
  const { room_id, user_id } = req.query;

  if (!room_id || !user_id) return res.status(400).send("Invalid Parameters");

  if (!rooms[room_id]) rooms[room_id] = { users: [] };

  // Check if user already exists
  if (!rooms[room_id].users.find(user => user.user_id === user_id)) {
    rooms[room_id].users.push({ user_id, name: `User-${user_id}` });
  }

  res.json({ users: rooms[room_id].users });
});

// API to clear room (stop command)
app.post("/api/stop-room", (req, res) => {
  const { room_id } = req.body;
  if (rooms[room_id]) delete rooms[room_id];
  res.json({ message: "Room stopped" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});