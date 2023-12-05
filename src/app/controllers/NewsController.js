// NewsController.js
class NewsController {
  index(req, res) {
    res.render('login')
  }

  show(req, res) {
    res.send('News details')
  }
}

module.exports = new NewsController()
