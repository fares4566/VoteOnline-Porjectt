const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String,required:true},
  votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
});

module.exports = mongoose.model('User', UserSchema);
