const express = require("express");
const { authenticateUser } = require("../middleware/auth");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send("Admin Dashboard");
});
