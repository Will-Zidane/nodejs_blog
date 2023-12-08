const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1/it_education_dev',
    collectionName: 'sessions',
  }),
  cookie: { secure: true },
});
