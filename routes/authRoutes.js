const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authController = require("../controller/authController");
const adminController = require("../controller/adminController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("admin/register", adminController.registerAdmin);
router.get("admin/login", adminController.getAdmins);
router.get("admin/logout", adminController.logoutAdmins);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const { _id } = req.user;
    const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
      expiresIn: 10 * 60 * 3,
    });
    res.cookie("token", token);
    res.cookie("tokenExpiryTime", 10 * 60 * 3);
    res.redirect(`http://localhost:5173/profile`);
  }
);

module.exports = router;
