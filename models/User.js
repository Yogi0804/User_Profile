const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      name: { type: String },
      bio: { type: String },
      phone: { type: String },
      photo: { type: String },
      visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
    },
    metadata: { type: mongoose.Schema.Types.Mixed },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
