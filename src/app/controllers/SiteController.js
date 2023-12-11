const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

// SiteController class to handle site-related operations
class SiteController {
  // GET request handler for rendering the home page
  index(req, res, next) {
    // Retrieve all courses from the database
    Course.find({})
      .then((courses) => {
        // Convert each course to a plain JavaScript object
        courses = courses.map((course) => course.toObject());
        
        // Render the 'home' view with the retrieved courses
        res.render('home', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // GET request handler for rendering the search page
  search(req, res) {
    res.render('search');
  }

  // Logout handler, redirects to the login page
  logout(req, res, next) {
    // Check for errors and redirect to the login page
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  };
}

// Export an instance of SiteController
module.exports = new SiteController();
