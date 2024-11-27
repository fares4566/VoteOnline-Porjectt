const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');  // Import the Vote model
const Option = require('../models/option');  // Import the Option model
const mongoose = require('mongoose');

// Cast a vote (without sondageId in req.body)
router.post('/cast', async (req, res) => {
  const { userId, optionId } = req.body;  // Only need userId and optionId

  if (!userId || !optionId) {
    return res.status(400).send("Missing required fields: userId or optionId.");
  }

  try {
    // Check if the user has already voted for this option
    const existingVote = await Vote.findOne({ user: userId, option: optionId });

    if (existingVote) {
      return res.status(400).send("You have already voted for this option.");
    }

    // Validate and convert the optionId to ObjectId if needed
    const optionObjectId = mongoose.Types.ObjectId(optionId);
    
    // Find the option and populate the sondage data
    const option = await Option.findById(optionObjectId).populate('sondage');  // Populate the associated sondage

    if (!option) {
      return res.status(404).send("Option not found.");
    }

    if (!option.sondage) {
      return res.status(404).send("Sondage not found for this option.");
    }

    // Increment the votes count for the selected option
    option.votes += 1;
    await option.save();  // Save the updated option

    // Record the vote in the Vote collection
    const newVote = new Vote({ user: userId, option: optionId });
    await newVote.save();  // Save the vote in the database

    return res.status(201).send("Vote cast successfully.");
  } catch (error) {
    console.error("Error casting vote:", error);
    return res.status(500).send("An error occurred while casting the vote.");
  }
});

module.exports = router;
