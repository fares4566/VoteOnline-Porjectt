const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const router = express.Router();

dotenv.config();

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

process.env.JWT_SECRET = generateSecretKey();

// Register new user
router.post('/register', (req, res) => {
  const { id, name, email, password } = req.body;
  const user = { id, name, email, password };
  req.app.locals.users.push(user);
  res.status(201).send("User registered successfully.");
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = req.app.locals.users.find(user => user.email === email && user.password === password);

  if (user) {
    const payload = { id: user.id, email: user.email };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server error: JWT_SECRET is missing' });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true, // Prevent access via client-side JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 3600000 // Cookie expiration in milliseconds (1 hour)
    });

    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).send('Invalid credentials');
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
