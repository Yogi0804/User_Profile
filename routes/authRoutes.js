const express = require("express");
const passport = require("passport");

const authController = require("../controller/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/protected",
  }),
  (req, res) => {
    res.redirect("/"); // Redirect to homepage or dashboard
  }
);

module.exports = router;
