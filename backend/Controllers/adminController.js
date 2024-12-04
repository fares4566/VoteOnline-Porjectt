// controllers/adminController.js
const adminService = require('../services/adminService');

// Dashboard route controller
const getDashboard = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    const sondages = await adminService.getSondages();
    res.render('admin/dashboard', { users, sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard.', error });
  }
};

// Users route controller
const getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.render('admin/users', { users });
  } catch (error) {
    res.status(500).json({ message: 'Error loading users.', error });
  }
};

// Sondages route controller
const getSondages = async (req, res) => {
  try {
    const sondages = await adminService.getSondages();
    res.render('admin/sondages', { sondages });
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
      res.redirect('/admin/sondages');
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
  deleteSondage
};
