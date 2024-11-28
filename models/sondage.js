const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Option= require('./option')

const SondageSchema = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now },
  dateExpiration: { type: Date, required: true },
  statut: { type: String, enum: ['open', 'closed'], default: 'open' },
  options: [{ type: Schema.Types.ObjectId, ref: 'Sondage', required: true }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Sondage', SondageSchema);
