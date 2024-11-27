const express = require('express');
const router = express.Router();
const Vote = require('../models/vote');  
const Option = require('../models/option');  
const mongoose = require('mongoose');

router.post('/cast', async (req, res) => {
  const { userId, optionId } = req.body;  

  if (!userId || !optionId) {
    return res.status(400).send("Missing required fields: userId or optionId.");
  }

  try {
   
    const existingVote = await Vote.findOne({ user: userId, option: optionId });

    if (existingVote) {
      return res.status(400).send("You have already voted for this option.");
    }

   
    const optionObjectId = mongoose.Types.ObjectId(optionId);
    
    // Find the option and populate the sondage data
    const option = await Option.findById(optionObjectId).populate('sondage');  

    if (!option) {
      return res.status(404).send("Option not found.");
    }

    if (!option.sondage) {
      return res.status(404).send("Sondage not found for this option.");
    }

  
    option.votes += 1;
    await option.save();  

   
    const newVote = new Vote({ user: userId, option: optionId });
    await newVote.save(); 

    return res.status(201).send("Vote cast successfully.");
  } catch (error) {
    console.error("Error casting vote:", error);
    return res.status(500).send("An error occurred while casting the vote.");
  }
});

module.exports = router;
