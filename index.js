const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes.js');
var cors = require('cors');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.set('view engine', 'ejs');
app.use(cors())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: "140119441669141",
    clientSecret: "fcdf079a830be6ada4c32f8d8b03908b",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new GoogleStrategy({
    clientID: "582770959519-ln3k923fpa545hi2mfv15312go5f41pk.apps.googleusercontent.com",
    clientSecret: "bkI4B5ANXuBjb1_blyaupQh4",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
         return done(null, profile);

   // console.log(profile);
       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
       //   return done(err, user);
       // });
  }
));

app.use('/', routes);

const port = 3000;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});