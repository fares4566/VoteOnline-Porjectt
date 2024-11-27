const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  option: { type: Schema.Types.ObjectId, ref: 'Option', required: true },
  voteDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
