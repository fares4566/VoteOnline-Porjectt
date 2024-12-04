// services/adminService.js
const User = require('../models/user');
const Sondage = require('../models/sondage');

// Get all users
const getUsers = async () => {
  return await User.find();
};

// Get all sondages and populate user data
const getSondages = async () => {
  return await Sondage.find().populate('user');
};

// Delete a sondage by ID
const deleteSondage = async (id) => {
  const sondage = await Sondage.findByIdAndDelete(id);
  return sondage; // Returns the deleted sondage, or null if not found
};

module.exports = {
  getUsers,
  getSondages,
  deleteSondage
};
