// Import required modules
const User = require('../models/User');
const bcrypt = require('bcrypt');

// SignUpController class to handle user sign-up operations
class SignUpController {
  // GET request handler for rendering the sign-up page
  get(req, res, next) {
    // Set isAuthenticated to false and render the 'auth/signup' view
    res.locals.isAuthenticated = false;
    res.render('auth/signup');
  }

  // POST request handler for processing and storing user sign-up data
  store(req, res, next) {
    // Create a new User instance with hashed passwords
    const user = new User({
      name: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      repeatPassword: bcrypt.hashSync(req.body.repeatPassword, 10),
    });

    // Check if a user with the same email already exists
    User.findOne({ email: user.email })
      .exec()
      .then(existingUser => {
        if (existingUser) {
          // If a user with the same email exists, send an error message
          res.send('You already have a user with that email');
        } else {
          // If no existing user, save the new user
          user.save()
            .then(() => {
              // Set isAuthenticated based on the request data and redirect to the success page
              res.locals.isAuthenticated = req.body.isAuthenticated === 'true';
              res.redirect('/signup/store');
            })
            .catch(error => next(error));
        }
      })
      .catch(error => next(error));
  }

  // GET request handler for rendering the success page after user sign-up
  show(req, res, next) {
    // Render the 'auth/store' view with authentication status
    res.render('auth/store', { isAuthenticated: req.isAuthenticated() });
  }
}

// Export an instance of SignUpController
module.exports = new SignUpController();
