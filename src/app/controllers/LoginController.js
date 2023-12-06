const passport = require('passport');

class LoginController {
  login_get(req, res) {
    res.render('auth/login');
  }

  login_post(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/dashboard', // Redirect to dashboard if authentication is successful
      failureRedirect: '/login', // Redirect back to login page if authentication fails
      failureFlash: true, // Enable flash messages for failure
    })(req, res, next);
  }

  show(req, res) {
    res.send('Login details');
  }
}

module.exports = new LoginController();
