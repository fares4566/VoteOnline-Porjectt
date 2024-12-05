const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/dashboard', adminController.getDashboard);
router.get('/users/:id', adminController.getUserDetailById);


router.get('/users', adminController.getUsers);

router.get('/sondages', adminController.getSondages);

router.post('/sondages/delete/:id', adminController.deleteSondage);




module.exports = router;
