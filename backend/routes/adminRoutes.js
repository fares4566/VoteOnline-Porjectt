// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard route
router.get('/dashboard', adminController.getDashboard);

// Users route
router.get('/users', adminController.getUsers);

// Sondages route
router.get('/sondages', adminController.getSondages);

// Delete sondage route
router.post('/sondages/delete/:id', adminController.deleteSondage);

module.exports = router;
