const express = require('express');
const router = express.Router();

router.post('/cast', (req, res) => {
  const { userId, sondageId, optionId } = req.body;

  const userVotes = req.app.locals.userVotes;  // Access userVotes from app.locals

  // Check if user has already voted in this sondage (any option, not just the same one)
  const existingVote = userVotes.find(vote => vote.userId === userId && vote.sondageId === sondageId);

  if (existingVote) {
    return res.status(400).send("You have already voted in this sondage.");
  }

  // Find the sondage
  const sondages = req.app.locals.sondages;  // Access sondages from app.locals
  const sondage = sondages.find(s => s.id === sondageId);

  if (sondage) {
    // Find the option in the sondage
    const option = sondage.options.find(o => o.id === optionId);

    if (option) {
      // Cast the vote (increment votes count)
      option.votes += 1;

      // Record the vote (so the user can't vote again in the same sondage)
      userVotes.push({ userId, sondageId, optionId });

      return res.status(201).send("Vote cast successfully.");
    } else {
      return res.status(404).send("Option not found.");
    }
  } else {
    return res.status(404).send("Sondage not found.");
  }
});

router.get('/results/:sondageId', (req, res) => {
  const { sondageId } = req.params;
  const sondages = req.app.locals.sondages;  // Access sondages from app.locals
  const sondage = sondages.find(s => s.id == sondageId);

  if (sondage) {
    return res.send(sondage.options); // Return options with vote counts
  } else {
    return res.status(404).send("Sondage not found.");
  }
});

module.exports = router;
