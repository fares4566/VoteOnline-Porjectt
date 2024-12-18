// authController.js
const { registerUser, loginUser, updateUserProfile, getUserById } = require('../services/authService');
const adminService = require('../services/adminService');

// Register user
const register = async (req, res) => {
  const { nom, email, password, role } = req.body;
  try {
    const user = await registerUser(nom, email, password, role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser(email, password);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    if (user.role === 'user') {
      return res.json({ message: 'Login successful', token, user });
    }

    const users = await adminService.getUsers();
    const sondages = await adminService.getSondages();
    const sondageStats = await adminService.getSondageStats(); 
    const userStats = await adminService.getUserStats(); 

    res.render('admin/dashboard', { token, user, sondageStats,users,sondages,userStats });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};


// Update profile
const updateProfile = async (req, res) => {
  const { id, nom, email } = req.body;
  try {
    const user = await updateUserProfile(id, nom, email);
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
};



module.exports = {  register, login, updateProfile, getUser };
