const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.profile.visibility === "private" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "bio", "phone", "photo", "visibility"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const user = await User.findById(req.user._id);

    updates.forEach((update) => (user.profile[update] = req.body[update]));
    await user.save();

    res.status(200).json({ user: user.profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
