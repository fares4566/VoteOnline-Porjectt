// routes/sondageRoutes.js
const express = require('express');
const router = express.Router();
const sondageController = require('../Controllers/sondageController');

// Route to create a sondage
router.post('/create', sondageController.createSondage);

// Route to modify an existing sondage
router.put('/modify/:id', sondageController.modifySondage);

module.exports = router;
