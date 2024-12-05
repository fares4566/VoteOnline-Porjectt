// services/adminService.js
const User = require('../models/user');
const Sondage = require('../models/sondage');
const Option = require('../models/option');
// Get all users
const getUsers = async () => {
  const users = await User.find({ role: 'user' }); // Filter users by role 'user'


  // For each user, get their sondage count and the last sondage
  for (let user of users) {
    const sondageCount = await Sondage.countDocuments({ user: user._id });
    const lastSondage = await Sondage.findOne({ user: user._id }).sort({ createdAt: -1 });
    if (lastSondage) {
      user.lastSondage = new Date(lastSondage.dateCreation).toLocaleDateString('en-US', {
        weekday: 'long', // "Monday"
        year: 'numeric', // "2024"
        month: 'long',   // "December"
        day: 'numeric',  // "4"
      });
    } else {
      user.lastSondage = "None";
    }

    user.sondageCount = sondageCount; 
  }

  // Return an object with all the data needed for the view
  return  users;
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
// Get a user by ID with their sondages and options
const getUserById = async (userId) => {
  try {
    // Step 1: Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return null; // User not found
    }

    // Step 2: Fetch sondages linked to the user and populate options
    const sondages = await Sondage.find({ user: user._id })
      .populate({
        path: 'options',  // Populate the options field in each sondage
        model: 'Option',   // Explicitly set model for options
        select: 'libelle votes'  // Specify fields to populate for Option
      })
      .exec();  // Execute the query to return the populated sondages

    // Step 3: Return both user and sondages separately
    return { user, sondages };
  } catch (error) {
    console.error('Error fetching user or sondages:', error);
    throw error; // Propagate the error to the controller
  }
};






module.exports = {
  getUsers,
  getSondages,
  deleteSondage,
  getUserById
};
