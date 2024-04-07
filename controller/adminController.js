const User = require("../models/User");

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newAdmin = new User({ username, email, role: "admin" });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.email });
    if (!admin) return res.status(404).json({ message: "No admins found" });
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutAdmins = async (req, res) => {};
