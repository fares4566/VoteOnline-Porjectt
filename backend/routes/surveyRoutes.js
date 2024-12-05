const express = require('express');
const router = express.Router();
const sondageController = require('../Controllers/sondageController');

router.post('/create', sondageController.createSondage);

router.put('/modify/:id', sondageController.modifySondage);

module.exports = router;
