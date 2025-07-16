const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const {SALT_ROUNDS} = require("../config/serverConfig");
class UserService {
  async signup(data) {
    try {
      //This is used to check if the email already exists or not
      const existingUser = await UserRepository.findUserByEmail(data.email);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }
      //Use to store hash form of password in DB
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
      data.password = hashedPassword;
      //Create the user
      const response = await UserRepository.createUser(data);
      return response;
    } catch (error) {
      console.log("Error at User Service layer", error);
      throw error;
    }
  }
  async login(data) {
    try {
      // Finding the Email in DB if exist or not
      const user = await UserRepository.findUserByEmail(data.email);
      if (!user) {
        throw new Error("User not found with this email");
      }
      // Password check if the password is correct or not
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }
      //User logged in
      return user;
    } catch (error) {
      console.log("Error at User Service layer - login");
      throw error;
    }
  }
}
module.exports = new UserService();
