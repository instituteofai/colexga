const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('../vars');
const User = require('../models/user.model');

// Serialize the user.id to save in the cookie session
// So the browser will remember the user
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
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: google.redirectUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        identityProviderId: profile.id,
      });

      if (currentUser) {
        done(null, currentUser);
      } else {
        const user = new User({
          identityProviderId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
        const newUser = await user.save();
        done(null, newUser);
      }
    },
  ),
);
