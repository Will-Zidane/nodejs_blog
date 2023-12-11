const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /, /me/stored/courses
  // Render the stored courses page, optionally sorting based on query parameters
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    // Check if sorting parameters are present in the query
    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    // Retrieve courses and count of deleted courses asynchronously
    Promise.all([
      courseQuery,
      Course.countDocumentsWithDeleted({ deleted: true }),
    ]).then(([courses, deleteCount]) =>
      res.render('me/stored-courses', {
        deleteCount,
        courses: multipleMongooseToObject(courses),
      }),
    );
  }

  // [GET] /, /me/trash/courses
  // Render the trash courses page with soft-deleted courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new MeController();
