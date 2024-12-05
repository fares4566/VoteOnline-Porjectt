const voteService = require('../services/voteService');
const castVote = async (req, res) => {
    const { userId, optionId } = req.body;
  
    if (!userId || !optionId) {
      return res.status(400).json({ message: "Missing required fields: userId or optionId." });
    }
  
    try {
      const result = await voteService.castVote(userId, optionId);
  
      if (!result) {
        return res.status(400).json({ message: "Vote could not be cast." });
      }
  
      res.status(201).json({ message: "Vote cast successfully.", vote: result });
    } catch (error) {
      console.error("Error casting vote:", error);
      res.status(500).json({ message: "An error occurred while casting the vote.", error: error.message });
    }
  };
  
const deleteVote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await voteService.deleteVote(id);
    res.json({ message: "Vote deleted successfully.", vote: result });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the vote.", error });
  }
};

const getVotes = async (req, res) => {
  const { optionId } = req.params;

  try {
    const votes = await voteService.getVotes(optionId);
    res.json({ votes });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving votes.", error });
  }
};

module.exports = { castVote, deleteVote, getVotes };
