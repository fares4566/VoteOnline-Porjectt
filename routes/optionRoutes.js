const express = require('express');
const router = express.Router();
const Sondage = require('../models/sondage');
const Option = require('../models/option');  // Using the Option model

// Add a new option to a sondage
router.post('/add', async (req, res) => {
  const { label, sondageId } = req.body;

  if (!label || !sondageId) {
    return res.status(400).json({ message: "Missing required fields: label or sondageId." });
  }

  try {
    const sondage = await Sondage.findById(sondageId);
    if (!sondage) {
      return res.status(404).json({ message: "Sondage not found." });
    }

    // Embed the new option directly in the sondage
    const newOption = { libelle: label, votes: 0, sondage: sondageId };
    sondage.options.push(newOption);

    await sondage.save(); // Save the updated sondage with the embedded option

    res.status(201).json({ message: "Option added successfully.", sondage });
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).json({ message: "Error adding option.", error });
  }
});


// Modify an option by ID
router.put('/modify/:id', async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ message: "Missing required field: label." });
  }

  try {
    const option = await Option.findById(id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    option.libelle = label;
    await option.save();  // Save the updated option

    res.json({ message: "Option modified successfully.", option });
  } catch (error) {
    console.error("Error modifying option:", error);
    res.status(500).json({ message: "Error modifying option.", error });
  }
});

// Delete an option by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const option = await Option.findByIdAndDelete(id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    res.json({ message: "Option deleted successfully." });
  } catch (error) {
    console.error("Error deleting option:", error);
    res.status(500).json({ message: "Error deleting option.", error });
  }
});

module.exports = router;
