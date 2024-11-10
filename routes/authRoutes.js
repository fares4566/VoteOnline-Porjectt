const express = require('express');
const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
  const { id, name, email, password } = req.body;
  const user = { id, name, email, password };
  req.app.locals.users.push(user);  // Use shared users array
  res.status(201).send("User registered successfully.");
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = req.app.locals.users.find(user => user.email === email && user.password === password);
  if (user) {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Update user profile
router.put('/update-profile', (req, res) => {
  const { id, name, email } = req.body;
  const user = req.app.locals.users.find(user => user.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.send("Profile updated successfully");
  } else {
    res.status(404).send("User not found");
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.app.locals.users.find(s => s.id == id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found.");
  }
});

module.exports = router;
