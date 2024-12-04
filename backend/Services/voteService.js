// services/voteService.js
const Vote = require('../models/vote');
const Option = require('../models/option');

const castVote = async (userId, optionId) => {
  try {
    // Find the option and populate the related sondage (poll)
    const option = await Option.findById(optionId).populate('sondage');
    if (!option) {
      throw new Error("Option not found.");
    }

    // Check if the user has already voted in this poll (sondage)
    const existingVote = await Vote.findOne({ 
      user: userId, 
      'option.sondage': option.sondage._id 
    });

    if (existingVote) {
      throw new Error("You have already voted in this sondage.");
    }

    // Increment the vote count for the selected option
    option.votes += 1;
    await option.save();

    // Save the new vote
    const newVote = new Vote({ user: userId, option: option });
    await newVote.save();

    return newVote;
  } catch (error) {
    throw new Error(`Error casting vote: ${error.message}`);
  }
};

const deleteVote = async (voteId) => {
  try {
    // Find the vote to be deleted
    const vote = await Vote.findById(voteId);
    if (!vote) {
      throw new Error("Vote not found.");
    }

    // Decrement the vote count of the associated option
    const option = await Option.findById(vote.option);
    if (!option) {
      throw new Error("Option not found.");
    }

    option.votes -= 1;
    await option.save();

    // Delete the vote
    await Vote.findByIdAndDelete(voteId);

    return vote;
  } catch (error) {
    throw new Error(`Error deleting vote: ${error.message}`);
  }
};

const getVotes = async (optionId) => {
  try {
    // Retrieve all votes for a specific option
    const votes = await Vote.find({ 'option._id': optionId }).populate('user');
    return votes;
  } catch (error) {
    throw new Error(`Error retrieving votes: ${error.message}`);
  }
};

module.exports = { castVote, deleteVote, getVotes };
