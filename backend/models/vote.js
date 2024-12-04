const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Option= require('./option')
const VoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  option: Option.schema,
  voteDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
