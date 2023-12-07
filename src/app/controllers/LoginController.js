const User = require('../models/User')
const bcrypt = require('bcrypt')
class LoginController {
  login_get(req, res) {
    res.render('auth/login')
  }

  login_post(req, res, next) {
    User.findOne({ email: req.body.email })
      .exec()
      .then((check) => {
        if (!check) {
          res.send('User cannot be found !!!!!')
        }

        return bcrypt.compare(req.body.password, check.password)
      })
      .then((isPasswordMatch) => {
        if (isPasswordMatch) {
          if(req.isAuthenticated) res.locals.isAuthenticated = req.isAuthenticated();
          res.redirect('/')
        } else {
          res.send('Incorrect password')
        }
      })
      .catch((error) => {
        // Handle errors, for example, by passing them to the next middleware
        next(error)
      })
  }

  show(req, res, next) {
    res.render('home',{isAuthenticated: req.isAuthenticated()})
  }
}

module.exports = new LoginController()
