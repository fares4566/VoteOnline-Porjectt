const Sondage = require('../models/sondage');
const Option = require('../models/option');

const addOption = async (label, sondageId) => {
  try {
    const sondage = await Sondage.findById(sondageId);
    if (!sondage) {
      throw new Error('Sondage not found.');
    }

    const newOption = new Option({ libelle: label, votes: 0, sondage: sondageId });
    await newOption.save();

    sondage.options.push(newOption._id);
    await sondage.save();

    return newOption;
  } catch (error) {
    throw new Error(`Error adding option: ${error.message}`);
  }
};

const modifyOption = async (id, label) => {
  try {
    const option = await Option.findById(id);
    if (!option) {
      throw new Error('Option not found.');
    }

    option.libelle = label;
    await option.save();

    return option;
  } catch (error) {
    throw new Error(`Error modifying option: ${error.message}`);
  }
};

const deleteOption = async (id) => {
  try {
    const option = await Option.findByIdAndDelete(id);
    if (!option) {
      throw new Error('Option not found.');
    }

    await Sondage.updateOne(
      { options: id },
      { $pull: { options: id } }
    );
  } catch (error) {
    throw new Error(`Error deleting option: ${error.message}`);
  }
};

module.exports = { addOption, modifyOption, deleteOption };
