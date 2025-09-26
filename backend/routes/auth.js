const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const user = await usersModel.findOne({ Email_id:username, password:password }); 
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {expiresIn: "1h",  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
  });

  res.json({ message: "Login Successful" });
});

router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Authenticated", user: decoded });
  });
});

// 🔹 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;