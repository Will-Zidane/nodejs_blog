// Middleware to handle sorting in the application
module.exports = function (req, res, next) {
  // Initialize sorting information in res.locals
  res.locals._sort = {
    enabled: false,  // Sorting is initially disabled
    type: 'default', // Default sorting type
  }

  // Check if sorting parameters are present in the query
  if (req.query.hasOwnProperty('_sort')) {
    // If sorting parameters are present, enable sorting and update sorting information
    Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type,
      column: req.query.column,
    });
  }

  // Continue to the next middleware or route handler
  next();
}
