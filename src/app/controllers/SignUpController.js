// NewsController.js
const { alternatives } = require('joi')
const User = require('../models/User')
const bcrypt = require('bcrypt')
class SignUpController {
  get(req, res, next) {
    res.render('auth/signup')
  }

  store(req, res, next) {
    const user = new User({
      name: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      repeatPassword: bcrypt.hashSync(req.body.repeatPassword, 10),
    })

    User.findOne({ email: user.email }).exec()
    .then(existingUser => {
      if (existingUser) {
        res.send('You already have a user with that email')
      } else {
        // If no existing user, save the new user
        user.save()
          .then(() => {
            if(req.isAuthenticated) res.locals.isAuthenticated = req.isAuthenticated();
            res.redirect('/signup/store')})
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
  }

  show(req, res, next) {
    res.render('auth/store')
  }
}

module.exports = new SignUpController()
