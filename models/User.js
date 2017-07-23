const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  fbID:  String,
  lastState: String
})

module.exports = mongoose.model('User', userSchema)
