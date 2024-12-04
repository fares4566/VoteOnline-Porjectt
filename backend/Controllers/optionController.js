// controllers/optionController.js
const optionService = require('../services/optionService');

const addOption = async (req, res) => {
  const { label, sondageId } = req.body;

  if (!label || !sondageId) {
    return res.status(400).json({ message: "Missing required fields: label or sondageId." });
  }

  try {
    const result = await optionService.addOption(label, sondageId);
    res.status(201).json({ message: "Option added successfully.", option: result });
  } catch (error) {
    res.status(500).json({ message: "Error adding option.", error });
  }
};

const modifyOption = async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ message: "Missing required field: label." });
  }

  try {
    const result = await optionService.modifyOption(id, label);
    res.json({ message: "Option modified successfully.", option: result });
  } catch (error) {
    res.status(500).json({ message: "Error modifying option.", error });
  }
};

const deleteOption = async (req, res) => {
  const { id } = req.params;

  try {
    await optionService.deleteOption(id);
    res.json({ message: "Option deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting option.", error });
  }
};

module.exports = { addOption, modifyOption, deleteOption };
