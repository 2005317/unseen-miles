const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    // Get your clientID and clientSecret from https://console.developers.google.com/
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:5000/google/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have the user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
          }).save().then(newUser => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          });
        }
      })
    }
  ));
} else {
  console.warn("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing. Google Auth will not work.");
}
