const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(
  new googleStrategy(
    {
      clientID: "588856288629-4phr0fvq6ublf701i36g4qi4fbunibbq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Find the user in the database
        let user = await User.findOne({ email: profile.emails[0].value }).exec();
        console.log(profile);
        if (user) {
          // If found, set this user as req.user
          return done(null, user);
        } else {
          // If not found, create the user and set it as req.user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          });
          return done(null, user);
        }
      } catch (err) {
        console.log("Error in GS passport", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
