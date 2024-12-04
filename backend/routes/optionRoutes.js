const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sondage = require('../models/sondage'); 
const Option = require('../models/option');   

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

    const newOption = new Option({ libelle: label, votes: 0, sondage: sondageId });
    await newOption.save();

    sondage.options.push(newOption._id);
    await sondage.save();

    res.status(201).json({ message: "Option added successfully.", option: newOption });
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).json({ message: "Error adding option.", error });
  }
});

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
    await option.save();  

    res.json({ message: "Option modified successfully.", option });
  } catch (error) {
    console.error("Error modifying option:", error);
    res.status(500).json({ message: "Error modifying option.", error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const option = await Option.findByIdAndDelete(id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    await Sondage.updateOne(
      { options: id },
      { $pull: { options: id } }
    );

    res.json({ message: "Option deleted successfully." });
  } catch (error) {
    console.error("Error deleting option:", error);
    res.status(500).json({ message: "Error deleting option.", error });
  }
});

module.exports = router;
