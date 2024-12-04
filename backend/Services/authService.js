// authService.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
}

// Register user service
const registerUser = async (nom, email, password, role = 'user') => {
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Assign role
  const newRole = role === 'admin' ? 'admin' : 'user';

  // Create new user
  const user = new User({ nom, email, password, role: newRole });
  await user.save();
  
  return user;
};

// Login user service
const loginUser = async (email, password) => {
  // Find the user by email and password
  const user = await User.findOne({ email, password });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Create JWT token
  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

// Update profile service
const updateUserProfile = async (id, nom, email) => {
  // Find user by ID
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Update user details
  user.nom = nom || user.nom;
  user.email = email || user.email;
  await user.save();

  return user;
};

// Get user by ID service
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { registerUser, loginUser, updateUserProfile, getUserById };
