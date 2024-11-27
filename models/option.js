const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  libelle: { type: String, required: true },
  votes: { type: Number, default: 0 },
  sondage: { type: Schema.Types.ObjectId, ref: 'Sondage', required: true }
});

module.exports = mongoose.model('Option', OptionSchema);
