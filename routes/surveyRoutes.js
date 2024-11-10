const express = require('express');
const router = express.Router();

// Create a new sondage
router.post('/create', (req, res) => {
  const { id, title, description, userId } = req.body; // userId to associate with creator
  const newSondage = { id, title, description, userId, options: [] };
  req.app.locals.sondages.push(newSondage);  // Use shared sondages array
  res.status(201).send("Sondage created successfully.");
});

// Modify a sondage
router.put('/modify/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const sondage = req.app.locals.sondages.find(s => s.id == id);
  if (sondage) {
    sondage.title = title;
    sondage.description = description;
    res.send("Sondage modified successfully.");
  } else {
    res.status(404).send("Sondage not found.");
  }
});

// Get a sondage by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sondage = req.app.locals.sondages.find(s => s.id == id);
  if (sondage) {
    res.send(sondage);
  } else {
    res.status(404).send("Sondage not found.");
  }
});

module.exports = router;
