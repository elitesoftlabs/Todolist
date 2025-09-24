const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Allow credentials (cookies) from frontend
app.use(cors({
  origin: "http://localhost:5173", // your React app URL
  credentials: true
}));

const PORT = 5000;
const SECRET_KEY = "mysecretkey";

// Fake DB
let users = [{ username: "admin", password: bcrypt.hashSync("admin123", 8) }];
let tasks = [{ id: 1, title: "First Task", description: "Setup React", status: "Pending" }];

// Middleware to verify token from cookies
function verifyToken(req, res, next) {
  const token = req.cookies.token;  // ✅ Read token from cookie
  if (!token) return res.status(403).send("No token provided.");
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized.");
    req.user = decoded;
    next();
  });
}

// --- AUTH APIs ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  // ✅ Send as HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,    // true if using HTTPS
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1h
  });

  res.json({ message: "Login successful" });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// --- TASK APIs ---
app.get("/api/tasks", verifyToken, (req, res) => res.json(tasks));

app.post("/api/tasks", verifyToken, (req, res) => {
  const { title, description, status } = req.body;
  const newTask = { id: tasks.length + 1, title, description, status };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/api/tasks/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  let task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).send("Task not found");
  task.title = title;
  task.description = description;
  task.status = status;
  res.json(task);
});

app.delete("/api/tasks/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
