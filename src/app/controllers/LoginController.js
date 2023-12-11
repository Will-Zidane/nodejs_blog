const User = require('../models/User');
const bcrypt = require('bcrypt');

class LoginController {
  // Render the login page with user authentication information
  login_get(req, res) {
    res.render('home', {
      isAuthenticated: req.isAuthenticated(),
      user: req.session.user,
    });
  }

  // Handle the login form submission, authenticate the user, and redirect accordingly
  login_post(req, res, next) {
    let foundUser;

    // Find the user with the provided email in the database
    User.findOne({ email: req.body.email })
      .exec()
      .then((check) => {
        // If the user is not found, display an error message and redirect to the login page
        if (!check) {
          res.send('error', 'User cannot be found!');
          return res.redirect('/login');
        }

        foundUser = check;

        // Compare the entered password with the hashed password in the database
        return bcrypt.compare(req.body.password, check.password);
      })
      .then((isPasswordMatch) => {
        // If the password matches, log in the user and redirect to the home page
        if (isPasswordMatch) {
          req.login(foundUser, (err) => {
            if (err) {
              return next(err);
            }
            // Set user information in session
            res.locals.isAuthenticated = req.isAuthenticated();
            req.session.user = {
              id: foundUser._id,
              name: foundUser.name,
              email: foundUser.email,
            };
            return res.redirect('/');
          });
        } else {
          // If the password is incorrect, display an error message and redirect to the login page
          res.send('error', 'Incorrect password');
          return res.redirect('/login');
        }
      })
      .catch((error) => {
        // Handle errors, for example, by passing them to the next middleware
        next(error);
      });
  }

  // Render the home page with user authentication information
  show(req, res, next) {
    res.render('home', { isAuthenticated: req.isAuthenticated() });
  }
}

module.exports = new LoginController();
