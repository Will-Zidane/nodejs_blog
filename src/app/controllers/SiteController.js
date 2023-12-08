const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        courses = courses.map((course) => course.toObject())
        res.render('home', {
          courses: multipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }
  search(req, res) {
    res.render('search')
  }
  logout(req, res) {
      if (err) { return next(err); }
      res.redirect('/login');
    };
}

module.exports = new SiteController()
