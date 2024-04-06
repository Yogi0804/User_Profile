const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  try {
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Unauthorized request" });
  }
};

exports.authorize = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
