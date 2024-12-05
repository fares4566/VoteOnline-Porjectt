const adminService = require('../services/adminService');

const getDashboard = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    const sondages = await adminService.getSondages();
    const sondageStats = await adminService.getSondageStats(); 
    const userStats = await adminService.getUserStats(); 

    

    res.render('admin/dashboard', { users, sondages,sondageStats,userStats  });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard.', error });
  }
};
const getUserDetailById = async (req, res) => {
  const userId = req.params.id;

  try {
    const { user, sondages } = await adminService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(JSON.stringify(sondages, null, 2));

    res.json({ user, sondages });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};




const getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.render('admin/dashboard', { users });
  } catch (error) {
    res.status(500).json({ message: 'Error loading users.', error });
  }
};

const getSondages = async (req, res) => {
  try {
    const sondages = await adminService.getSondages();
    res.render('admin/dashboard', { sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading sondages.', error });
  }
};

const deleteSondage = async (req, res) => {
  const { id } = req.params;
  try {
    const sondageDeleted = await adminService.deleteSondage(id);
    if (sondageDeleted) {
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
