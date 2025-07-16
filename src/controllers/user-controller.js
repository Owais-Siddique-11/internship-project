const UserService = require('../services/user-service');

const signup = async (req, res) => {
  try {
    const user = await UserService.signup(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      err: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      data: {},
      err: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserService.login(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      err: {}
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Login failed",
      data: {},
      err: error.message
    });
  }
};

module.exports = {
  signup,
  login
};
