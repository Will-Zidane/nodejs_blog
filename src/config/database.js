// config/database.js
const mongoose = require('mongoose')
const { mongoUrl } = require('../config/keys') // You can keep MongoDB connection URL in a separate file

const connect = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

module.exports = { connect }
