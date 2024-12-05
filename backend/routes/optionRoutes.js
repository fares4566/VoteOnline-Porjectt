const express = require('express');
const router = express.Router();
const optionController = require('../Controllers/optionController');

router.post('/add', optionController.addOption);
router.put('/modify/:id', optionController.modifyOption);
router.delete('/delete/:id', optionController.deleteOption);

module.exports = router;
