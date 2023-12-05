// NewsController.js
class LoginController {
  login_get(req, res) {
    res.render('auth/login')
  }
  
  login_post(req, res) {
    res.render('login')
  }

  show(req, res) {
    res.send('Login details')
  }
}

module.exports = new LoginController()
