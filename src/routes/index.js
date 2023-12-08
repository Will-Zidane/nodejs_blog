// site.route.js

const siteRouter = require('./site.route')
const courseRouter = require('./courses.route')
const meRouter = require('./me.route')
const loginRouter = require('./login.route')
const signupRouter = require('./signup.route')
const logoutRouter = require('./logout.route')

function route(app) {
  app.use('/courses', courseRouter)
  app.use('/', siteRouter)
  app.use('/me', meRouter)
  app.use('/login', loginRouter)
  app.use('/signup', signupRouter)
  app.use('/logout', logoutRouter)
}

module.exports = route
