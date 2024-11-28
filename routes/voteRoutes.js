const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');
const Option = require('../models/option');

router.post('/cast', async (req, res) => {
  const { userId, optionId } = req.body;

  if (!userId || !optionId) {
    return res.status(400).json({ message: "Missing required fields: userId or optionId." });
  }

  try {
    const option = await Option.findById(optionId).populate('sondage');
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    const existingVote = await Vote.findOne({ 
      user: userId, 
      'option.sondage': option.sondage._id 
    });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted in this sondage." });
    }

    option.votes += 1;
    await option.save();

    const newVote = new Vote({ user: userId, option: option });
    await newVote.save();

    return res.status(201).json({ message: "Vote cast successfully.", vote: newVote });
  } catch (error) {
    console.error("Error casting vote:", error);
    return res.status(500).json({ message: "An error occurred while casting the vote.", error });
  }
});

module.exports = router;
