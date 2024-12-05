const Vote = require('../models/vote');
const Option = require('../models/option');

const castVote = async (userId, optionId) => {
  try {
    const option = await Option.findById(optionId).populate('sondage');
    if (!option) {
      throw new Error("Option not found.");
    }

    const existingVote = await Vote.findOne({ 
      user: userId, 
      'option.sondage': option.sondage._id 
    });

    if (existingVote) {
      throw new Error("You have already voted in this sondage.");
    }

    option.votes += 1;
    await option.save();

    const newVote = new Vote({ user: userId, option: option });
    await newVote.save();

    return newVote;
  } catch (error) {
    throw new Error(`Error casting vote: ${error.message}`);
  }
};

const deleteVote = async (voteId) => {
  try {
    const vote = await Vote.findById(voteId);
    if (!vote) {
      throw new Error("Vote not found.");
    }

    const option = await Option.findById(vote.option);
    if (!option) {
      throw new Error("Option not found.");
    }

    option.votes -= 1;
    await option.save();

    await Vote.findByIdAndDelete(voteId);

    return vote;
  } catch (error) {
    throw new Error(`Error deleting vote: ${error.message}`);
  }
};

const getVotes = async (optionId) => {
  try {
    const votes = await Vote.find({ 'option._id': optionId }).populate('user');
    return votes;
  } catch (error) {
    throw new Error(`Error retrieving votes: ${error.message}`);
  }
};

module.exports = { castVote, deleteVote, getVotes };
