// Import required modules
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')

require('./config/passport')

// Create an Express application
const app = express()

// Set the port for the application
const port = 3000

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1/it_education_dev',
      collectionName: 'sessions',
    }),
    cookie: { secure: true },
  }),
)

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
