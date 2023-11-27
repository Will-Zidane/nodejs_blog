const newsRouter = require('./news.route')
const siteRouter = require('./site.route')
const courseRouter = require('./courses.route')
const meRouter = require('./me.route')


function route(app) {
  app.use('/news', newsRouter)
  app.use('/courses', courseRouter)
  app.use('/', siteRouter)
  app.use('/me',meRouter)
}

module.exports = route
