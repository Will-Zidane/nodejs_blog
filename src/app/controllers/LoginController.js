const User = require('../models/User')
const bcrypt = require('bcrypt')
class LoginController {
  login_get(req, res) {
    res.render('home', { isAuthenticated: req.isAuthenticated(), user: req.session.user });
  }

  login_post(req, res, next) {
    let foundUser;
  
    User.findOne({ email: req.body.email })
      .exec()
      .then((check) => {
        if (!check) {
          res.send('error', 'User cannot be found!');
          return res.redirect('/login');
        }
  
        foundUser = check;
        return bcrypt.compare(req.body.password, check.password);
      })
      .then((isPasswordMatch) => {
        if (isPasswordMatch) {
          req.login(foundUser, (err) => {
            if (err) {
              return next(err);
            }
            res.locals.isAuthenticated = req.isAuthenticated();
            req.session.user = {
              id: foundUser._id,
              name: foundUser.name,
              email: foundUser.email,
            };
            return res.redirect('/');
          });
        } else {
          res.send('error', 'Incorrect password');
          return res.redirect('/login');
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
