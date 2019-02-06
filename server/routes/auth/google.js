const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../../db');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const stratrgyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
};

console.log(chalk.green('SETTEING UP OAUTH'));

passport.use(
  new GoogleStrategy(
    stratrgyConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: { email: profile.emails[0].value },
        });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res, next) {
    console.log('hitting route');
    res.redirect('/');
  }
);

module.exports = router;
