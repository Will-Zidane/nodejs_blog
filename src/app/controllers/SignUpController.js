// NewsController.js
const User = require('../models/User')
const bcrypt = require('bcrypt')
class SignUpController {
  get(req, res, next) {
    res.render('auth/signup')
  }

  store(req, res, next) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,10),
      repeatPassword: bcrypt.hashSync(req.body.repeatPassword,10) ,
    })
    user
      .save()
      .then(() => res.redirect('/signup/store'))
      .catch((error) => {})
  }

  show(req, res, next) {
    res.render('auth/store')
  }
}

module.exports = new SignUpController()
