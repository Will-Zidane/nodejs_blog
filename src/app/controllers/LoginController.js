const User = require('../models/User')
const bcrypt = require('bcrypt')
class LoginController {
  login_get(req, res) {
    res.render('auth/login', { isAuthenticated: req.isAuthenticated() })
  }

  login_post(req, res, next) {
    let foundUser; // Declare a variable to store the found user
  
    User.findOne({ email: req.body.email })
      .exec()
      .then((check) => {
        if (!check) {
          res.send('User cannot be found !!!!!');
        }
        foundUser = check; // Store the found user in the variable
        return bcrypt.compare(req.body.password, check.password);
      })
      .then((isPasswordMatch) => {
        if (isPasswordMatch) {
          // Log in the user and set isAuthenticated to true
          req.login(foundUser, (err) => {
            if (err) {
              return next(err);
            }
            res.locals.isAuthenticated = req.isAuthenticated();
            res.redirect('/');
          });
        } else {
          res.send('Incorrect password');
        }
      })
      .catch((error) => {
        // Handle errors, for example, by passing them to the next middleware
        next(error);
      });
  }
  

  show(req, res, next) {
    res.render('home', { isAuthenticated: req.isAuthenticated() })
  }
}

module.exports = new LoginController()
