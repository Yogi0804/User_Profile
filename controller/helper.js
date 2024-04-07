const User = require("../models/User");
exports.generateUniqueUsername = async (email) => {
  // Extracting the username part of the email address
  const username = email.substring(0, email.indexOf("@"));

  let candidateUsername = username;
  let count = 1;

  while (true) {
    const user = await User.findOne({ userName: candidateUsername });

    if (!user) {
      return candidateUsername;
    }
    candidateUsername = `${username}${count}`;
    count++;
  }
};
