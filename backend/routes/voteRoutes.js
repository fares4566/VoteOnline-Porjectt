const express = require('express');
const router = express.Router();
const voteController = require('../Controllers/voteController');

router.post('/cast', voteController.castVote);
router.delete('/delete/:id', voteController.deleteVote);  
router.get('/:optionId', voteController.getVotes);  
module.exports = router;
