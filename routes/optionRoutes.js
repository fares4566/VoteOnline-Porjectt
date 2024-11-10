const express = require('express');
const router = express.Router();

// Add an option to a sondage
router.post('/add', (req, res) => {
  const { id, label, sondageId } = req.body; // sondageId to associate option with a sondage
  const sondage = req.app.locals.sondages.find(s => s.id === sondageId); // Check if the sondage exists
  
  if (sondage) {
    const newOption = { id, label, votes: 0 }; // Create the new option
    sondage.options.push(newOption); // Add option to sondage
    res.status(201).send("Option added successfully.");
  } else {
    res.status(404).send("Sondage not found.");
  }
});

// Modify an option
router.put('/modify/:id', (req, res) => {
  const { id } = req.params;
  const { label } = req.body;
  const option = req.app.locals.sondages.flatMap(s => s.options).find(o => o.id == id); // Flatten to find option
  if (option) {
    option.label = label;
    res.send("Option modified successfully.");
  } else {
    res.status(404).send("Option not found.");
  }
});

// Delete an option
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  for (const sondage of req.app.locals.sondages) {
    const index = sondage.options.findIndex(o => o.id == id);
    if (index !== -1) {
      sondage.options.splice(index, 1); // Remove option from the sondage
      return res.send("Option deleted successfully.");
    }
  }
  res.status(404).send("Option not found.");
});

module.exports = router;
