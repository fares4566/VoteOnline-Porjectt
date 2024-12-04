// routes/voteRoutes.js
const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/cast', voteController.castVote);
router.delete('/delete/:id', voteController.deleteVote);  
router.get('/:optionId', voteController.getVotes);  
module.exports = router;
