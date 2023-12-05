const mongoose = require('mongoose')

const Schema = mongoose.Schema
const User = new Schema({
  name: String,
  email: String,
  password: String,
  repeatPassword:String,
}, 
{ timestamps: true },
)
 

module.exports = mongoose.model('User', User)