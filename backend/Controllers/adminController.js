// controllers/adminController.js
const adminService = require('../services/adminService');

// Dashboard route controller
const getDashboard = async (req, res) => {
  try {
     // Fetch userId from query parameters
    const users = await adminService.getUsers();
    const sondages = await adminService.getSondages();

    

    res.render('admin/dashboard', { users, sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard.', error });
  }
};
const getUserDetailById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the user and their sondages
    const { user, sondages } = await adminService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the sondages to see the populated options
    console.log(JSON.stringify(sondages, null, 2));

    // Return the user and sondages separately in the response
    res.json({ user, sondages });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};




// Users route controller
const getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.render('admin/dashboard', { users });
  } catch (error) {
    res.status(500).json({ message: 'Error loading users.', error });
  }
};

// Sondages route controller
const getSondages = async (req, res) => {
  try {
    const sondages = await adminService.getSondages();
    res.render('admin/dashboard', { sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading sondages.', error });
  }
};

// Delete sondage route controller
const deleteSondage = async (req, res) => {
  const { id } = req.params;
  try {
    const sondageDeleted = await adminService.deleteSondage(id);
    if (sondageDeleted) {
      // Redirect back to the dashboard after deletion
      res.redirect('/admin/dashboard');
    } else {
      res.status(404).send('Sondage not found.');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sondage.', error });
  }
};



module.exports = {
  getDashboard,
  getUsers,
  getSondages,
  deleteSondage,
  getUserDetailById
};
