const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
  // async index(req, res) {
  //   try {
  //     const courses = await Course.find({});
  //     res.json(courses);
  //   } catch (error) {
  //     res.status(400).json({ error: 'ERROR!!!' });
  //   }
  // }
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
}
module.exports = new SiteController()
