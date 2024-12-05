const sondageService = require('../services/sondageService');

const createSondage = async (req, res) => {
  const { titre, description, userId, dateExpiration } = req.body;

  try {
    const result = await sondageService.createSondage(titre, description, userId, dateExpiration);
    res.status(201).json({ message: 'Sondage created successfully', sondage: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sondage', error });
  }
};

const modifySondage = async (req, res) => {
  const { id } = req.params;
  const { titre, description, statut, dateExpiration } = req.body;

  try {
    const result = await sondageService.modifySondage(id, titre, description, statut, dateExpiration);
    res.json({ message: 'Sondage modified successfully', sondage: result });
  } catch (error) {
    res.status(500).json({ message: 'Error modifying sondage', error });
  }
};

module.exports = {
  createSondage,
  modifySondage
};
