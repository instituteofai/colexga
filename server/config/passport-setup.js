const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/user.model');
const logger = require('../logger');

// Serialize the user.id to save in the cookie session
// So the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the cookieUserId to user in the database
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.google.redirectUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      logger.log('Got Profile: pass setup', profile);
      const currentUser = await User.findOne({
        googleProfileId: profile.id,
      });

      if (currentUser) {
        done(null, currentUser);
      } else {
        const user = new User({
          googleProfileId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    },
  ),
);
