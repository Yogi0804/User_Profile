const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const { generateUniqueUsername } = require("../controller/helper");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userName = await generateUniqueUsername(profile.emails[0].value);
        const avatar = profile.photos[0].value;
        const user = await User.findOneAndUpdate(
          {
            email: profile.emails[0].value,
          },
          {
            metadata: { loginMethod: "Google" },
            userName,
            profile: {
              name: profile.displayName,
              photo: avatar,
              visibility: "public",
            },
          },
          { new: true, upsert: true }
        );
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            userName: profile.displayName,
            email: profile.emails[0].value,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        if (error.code === 11000 && error.keyValue.userName === null) {
          return done("Email already exists");
        } else {
          return done(error);
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
