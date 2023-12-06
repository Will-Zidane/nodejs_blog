// site.route.js
const newsRouter = require('./news.route')
const siteRouter = require('./site.route')
const courseRouter = require('./courses.route')
const meRouter = require('./me.route')
const loginRouter = require('./login.route')
const signupRouter = require('./signup.route')

function route(app) {
  app.use('/news', newsRouter)
  app.use('/courses', courseRouter)
  app.use('/', siteRouter)
  app.use('/me', meRouter)
  app.use('/login', loginRouter)
  app.use('/signup', signupRouter)
}

module.exports = route
