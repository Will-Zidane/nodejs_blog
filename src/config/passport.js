const { compareSync } = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./db/index'); // Corrected the path

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      if (!compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  }),
);
