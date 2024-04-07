const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const { generateUniqueUsername } = require("./helper");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userName = await generateUniqueUsername(email);
    console.log({ userName });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      profile: { visibility: "public" },
      role: "user",
    });
    const userData = await newUser.findOneAndUpdate({
      email: email,
    });
    const responseData = {
      username: userData.userName,
      email: userData.email,
    };
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 10 * 60 * 3,
    });
    res.cookie("token", token);
    res
      .status(201)
      .json({ message: "User registered successfully", data: responseData });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.userName === null) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password.toString(),
      user.password.toString()
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ message: "User logged in successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
