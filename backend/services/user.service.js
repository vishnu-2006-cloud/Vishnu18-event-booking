const User = require("../common/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { USER_IDENTIFIER_STATUS } = require("../common/config/constants");
const { INVALID_USER, INVALID_PASSWORD } = USER_IDENTIFIER_STATUS;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "booking-secrete";

const addUserToDatabase = async (data) => {
  try {
    const { username, password, role, firstName, lastName } = data;
    const cleanUsername = typeof username === "string" ? username.trim() : "";
    const cleanPassword = typeof password === "string" ? password : "";
    const cleanFirstName = typeof firstName === "string" ? firstName.trim() : "";
    const cleanLastName = typeof lastName === "string" ? lastName.trim() : "";
    const cleanRole = role === "Organizer" ? "Organizer" : "General";

    if (!cleanUsername || !cleanPassword) {
      const error = new Error("Username and password are required");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ username: cleanUsername });
    if (existingUser) {
      const error = new Error("Username already exists");
      error.statusCode = 409;
      throw error;
    }

    const hash = await bcrypt.hash(cleanPassword, saltRounds);
    const user = new User({
      username: cleanUsername,
      role: cleanRole,
      password: hash,
      firstName: cleanFirstName,
      lastName: cleanLastName,
    });

    await user.save();
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      username: user.username,
      token,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

const removeUserFromDatabase = async (userId) => {
  try {
    const result = await User.findOneAndDelete({ _id: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateUserFromDatabase = async (data) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: data.userId },
      { $set: data }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const checkUserExists = async (data) => {
  try {
    const usernameValue = typeof data?.username === "string" ? data.username.trim() : "";
    const passwordValue = typeof data?.password === "string" ? data.password : "";
    if (!usernameValue || !passwordValue) {
      return INVALID_USER;
    }
    const user = await User.findOne({ username: usernameValue });
    if (!user) {
      return INVALID_USER;
    }
    if (!bcrypt.compareSync(passwordValue, user.password)) {
      return INVALID_PASSWORD;
    }
    const token = await jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return [
      {
        token,
        role: user.role,
        username: user.username,
      },
    ];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserToDatabase,
  removeUserFromDatabase,
  updateUserFromDatabase,
  checkUserExists,
};
