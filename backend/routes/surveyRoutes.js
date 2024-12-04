const express = require('express');
const router = express.Router();
const Sondage = require('../models/sondage'); 
const User = require('../models/user'); 

router.post('/create', async (req, res) => {
  const { titre, description, userId, dateExpiration } = req.body; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newSondage = new Sondage({
      titre,
      description,
      dateCreation: new Date(),
      dateExpiration: new Date(dateExpiration), 
      statut: 'open', 
      user: user._id
    });
    await newSondage.save();

    res.status(201).json({ message: 'Sondage created successfully', sondage: newSondage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sondage', error });
  }
});

router.put('/modify/:id', async (req, res) => {
  const { id } = req.params;
  const { titre, description, statut, dateExpiration } = req.body; 

  try {
    const sondage = await Sondage.findById(id);
    if (!sondage) {
      return res.status(404).json({ message: 'Sondage not found' });
    }

    if (titre) sondage.titre = titre;
    if (description) sondage.description = description;
    if (statut) sondage.statut = statut;
    if (dateExpiration) sondage.dateExpiration = new Date(dateExpiration); 

    await sondage.save();

    res.json({ message: 'Sondage modified successfully', sondage });
  } catch (error) {
    res.status(500).json({ message: 'Error modifying sondage', error });
  }
});

module.exports = router;
