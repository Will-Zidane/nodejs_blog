const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
  // GET /course/:slug
  show(req, res, next) {
    // Retrieve a course by its slug and render the 'courses/show' view
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // Render the 'courses/create' view for creating a new course
  create(req, res, next) {
    console.log('Create method called');
    res.render('courses/create');
  }

  // Handle the creation of a new course and save it to the database
  store(req, res, next) {
    // Set the image URL based on the provided videoId from YouTube
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    // Find the latest course to generate a new unique ID for the new course
    Course.findOne({})
      .sort({ _id: 'desc' })
      .then((latestCourse) => {
        if (latestCourse) {
          req.body._id = latestCourse._id + 1;
        } else {
          req.body._id = 1; // Default value if there are no courses in the database yet
        }

        const course = new Course(req.body);

        // Save the new course to the database
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

  // Render the 'courses/edit' view for editing an existing course
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [PUT] /course/:id
  // Handle the update of an existing course and redirect to the stored courses page
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/me/stored/courses');
      })
      .catch(next);
  }

  // [DELETE] /course/:id
  // Soft delete a course and redirect back to the previous page
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /course/:id
  // Permanent delete a course and redirect back to the previous page
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /course/:id/restore
  // Restore a soft-deleted course and redirect back to the previous page
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /course/handle-form-action
  // Handle various form actions, such as deleting courses
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }

  // [PATCH] /courses/delete-form-action
  // Handle form actions for restoring or permanently deleting courses
  deleteFormAction(req, res, next) {
    switch (req.body.action) {
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'delete-forever':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid.' });
    }
  }
}

module.exports = new CourseController();
