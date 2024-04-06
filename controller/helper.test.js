const User = require("../models/User");

describe("generateUniqueUsername", () => {
  it("returns the email's userName if no user with the same email exists", async () => {
    const email = "john.doe@example.com";
    const userName = await generateUniqueUsername(email);

    expect(userName).toBe("john.doe");
  });

  it("returns a userName that does not exist if a user with the same email already exists", async () => {
    await User.insertMany([
      { userName: "john.doe1", email },
      { userName: "john.doe2", email },
    ]);

    const userName = await generateUniqueUsername(email);

    expect(userName).toBe("john.doe3");
  });
});
