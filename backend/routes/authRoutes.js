const express = require('express');
const router = express.Router();
const { register, login, updateProfile, getUser } = require('../Controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.put('/update-profile', updateProfile);

router.get('/:id', getUser);


module.exports = router;
