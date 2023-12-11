const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {
  // GET /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) })
      })
      .catch(next)
  }

  create(req, res, next) {
    console.log('Create method called')
    res.render('courses/create')
  }

  store(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
  
    Course.findOne({})
      .sort({ _id: 'desc' })
      .then((latestCourse) => {
        if (latestCourse) {
          req.body._id = latestCourse._id + 1;
        } else {
          req.body._id = 1; // Default value if there are no courses in the database yet
        }
  
        const course = new Course(req.body);
  
        course
          .save()
          .then(() => res.redirect('/me/stored/courses'))
          .catch((error) => {
            console.error('Error saving course:', error.message);
            next(error);
          });
      })
      .catch((error) => {
        console.error('Error finding latest course:', error.message);
        next(error);
      });
  }
  

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', { course: mongooseToObject(course) })
      })
      .catch(next)
  }

  // [PUT] /course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/me/stored/courses')
      })
      .catch(next)
  }

  // [DELETE] /course/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }
  // [DELETE] /course/:id
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [DELETE] /course/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [PATCH] /course/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      default:
        res.json({ message: 'Action is invalid!' })
    }
  }

  // [PATCH] /courses/delete-form-action
  deleteFormAction(req, res, next) {
    switch (req.body.action) {
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      case 'delete-forever':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      default:
        res.json({ message: 'Action is invalid.' })
    }
  }
}
module.exports = new CourseController()
