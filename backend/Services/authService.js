const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
}

const registerUser = async (nom, email, password, role = 'user') => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const newRole = role === 'admin' ? 'admin' : 'user';
  const user = new User({ nom, email, password, role: newRole });
  await user.save();
  
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email, password });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

const updateUserProfile = async (id, nom, email) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  user.nom = nom || user.nom;
  user.email = email || user.email;
  await user.save();

  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { registerUser, loginUser, updateUserProfile, getUserById };
