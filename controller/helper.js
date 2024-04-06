const User = require("../models/User");
exports.generateUniqueUsername = async (email) => {
  const users = await User.find({
    email: { $regex: new RegExp(`^${email}`) },
  });
  if (users.length === 0) {
    return email.split("@")[0];
  }
  let count = users.length;
  while (count) {
    const newUserName = `${email.split("@")[0]}${count}`;
    const usersWithNewUserName = await User.find({ userName: newUserName });
    if (usersWithNewUserName.length === 0) {
      return newUserName;
    }
    count++;
  }
};
