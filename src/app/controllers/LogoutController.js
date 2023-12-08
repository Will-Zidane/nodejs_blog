// NewsController.js
class LogoutController {
  logout(req, res) {
    // Set isAuthenticated to false
    res.locals.isAuthenticated = false
    res.render('auth/login')
  }

  show(req, res) {
    res.redirect('/login')
  }
}

module.exports = new LogoutController()
