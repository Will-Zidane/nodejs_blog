// Import required modules
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./app/models/User')
require('./config/passport')

// Create an Express application
const app = express()

// Set the port for the application
const port = 3000


app.use(session({
  secret: 'EUE7J3lUE01xhmCGQt04S8PbsMpUE5JDcQj0fyS0cy73PQVDLM',
  saveUninitialized: true,
  resave: true,
  // using store session on MongoDB using express-session + connect
  store: new MongoStore({
    mongoUrl: 'mongodb://127.0.0.1/it_education_dev',
    collection: 'sessions'
  }),
  cookie: { secure: false }
}));

// Set up passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err)
        }

        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Incorrect email or password' })
        }
      })
    })
  }),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});


app.use((req, res, next) => {
  console.log('isAuthenticated:', req.isAuthenticated())
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// Import routes and database configuration
const route = require('./routes')
const db = require('./config/db')

// Connect to the database
db.connect()

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Parse incoming requests with JSON payloads
app.use(express.json())

// Parse incoming requests with URL-encoded payloads
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Enable method override to use other HTTP methods like PUT and DELETE
app.use(methodOverride('_method'))

// HTTP request logger middleware
app.use(morgan('dev'))

// Configure the template engine (Handlebars)
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
)

// Set the view engine to Handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Set up routes
route(app)

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
