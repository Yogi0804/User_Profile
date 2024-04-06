const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");
const userProfileController = require("../controller/userProfileController");

router.get("/profile/:id", authenticateUser, userProfileController.getProfile);
router.put("/profile", authenticateUser, userProfileController.updateProfile);

module.exports = router;
