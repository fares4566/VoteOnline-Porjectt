const express = require('express');
const router = express.Router();
const Sondage = require('../models/sondage'); 

router.post('/add', async (req, res) => {
  const { label, sondageId } = req.body;

  try {
    const sondage = await Sondage.findById(sondageId);

    if (!sondage) {
      return res.status(404).json({ message: "Sondage not found." });
    }

    const newOption = { libelle: label, votes: 0, sondage: sondageId };
    sondage.options.push(newOption);

    await sondage.save();

    res.status(201).json({ message: "Option added successfully.", sondage });
  } catch (error) {
    res.status(500).json({ message: "Error adding option.", error });
  }
});

router.put('/modify/:id', async (req, res) => {
  const { id } = req.params; 
  const { label } = req.body;

  try {
    const sondage = await Sondage.findOne({ "options._id": id });

    if (!sondage) {
      return res.status(404).json({ message: "Option not found." });
    }

    const option = sondage.options.id(id);
    option.libelle = label;

    await sondage.save();

    res.json({ message: "Option modified successfully.", option });
  } catch (error) {
    res.status(500).json({ message: "Error modifying option.", error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const sondage = await Sondage.findOne({ "options._id": id });

    if (!sondage) {
      return res.status(404).json({ message: "Option not found." });
    }

    sondage.options.id(id).remove();

    await sondage.save();

    res.json({ message: "Option deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting option.", error });
  }
});

module.exports = router;
