// NewsController.js
class NewsController {
  index(req, res) {
    res.render('news')
  }

  show(req, res) {
    res.send('News details')
  }
}

module.exports = new NewsController()
