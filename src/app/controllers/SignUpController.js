// NewsController.js
const User = require('../models/User')

class SignUpController {
  get(req, res, next) {
    res.render('auth/signup')
  }

  create(req, re, next) {
    res.send('Nani')
  }

  store(req, res, next) {
  console.log(req.body); // Check the console to see the form data
  res.json(req.body);
}


  show(req, res, next) {
    res.send('SignUp details')
  }
}

module.exports = new SignUpController()
