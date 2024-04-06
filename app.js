const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userProfileRoutes = require("./routes/userProfileRoutes");
const { errorHandler } = require("./middleware/error");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const dotenv = require("dotenv");

// Load environment variables from .env file
const result = dotenv.config();

connectDB();

if (result.error) {
  console.error("Error loading .env file:", result.error);
  logger.error(`Error loading .env file: ${result.error}`);
} else {
  console.log("Loaded .env file successfully");
}

const app = express();
const PORT = process.env.PORT || "3000";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// Middleware
app.use(bodyParser.json());
app.use(
  session({ secret: "userProfile", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userProfileRoutes);

app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Authenticate with Google</a>`);
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
