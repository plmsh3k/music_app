// controllers/userController.js

const User = require("../models/user");

const userController = {
  // Function to handle user registration
  registerUser: async (username, password) => {
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  // Function to authenticate user
  authenticateUser: async (username, password) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user || !user.validatePassword(password)) {
        return null; // Authentication failed
      }
      return user; // Authentication successful
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userController;
