// authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, updateProfile, getUser, getUserDetail } = require('../Controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Update profile route
router.put('/update-profile', updateProfile);

// Get user by ID route
router.get('/:id', getUser);


module.exports = router;
