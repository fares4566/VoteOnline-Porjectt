// services/sondageService.js
const Sondage = require('../models/sondage');
const User = require('../models/user');

// Create a new sondage
const createSondage = async (titre, description, userId, dateExpiration) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
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
  return newSondage;
};

// Modify an existing sondage
const modifySondage = async (id, titre, description, statut, dateExpiration) => {
  const sondage = await Sondage.findById(id);
  if (!sondage) {
    throw new Error('Sondage not found');
  }

  if (titre) sondage.titre = titre;
  if (description) sondage.description = description;
  if (statut) sondage.statut = statut;
  if (dateExpiration) sondage.dateExpiration = new Date(dateExpiration);

  await sondage.save();
  return sondage;
};

module.exports = {
  createSondage,
  modifySondage
};
