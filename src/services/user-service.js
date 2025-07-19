const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS, ADMIN_SECRET_KEY,JWT_SECRET } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

class UserService {
  async signup(data) {
    try {
      const { email, password, role, secretKey } = data;

      // 1. Check if user already exists
      const existingUser = await UserRepository.findUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // 2. Admin secret key check
      if (role === "admin") {
        if (!secretKey || secretKey !== ADMIN_SECRET_KEY) {
          throw new Error("Invalid or missing admin secret key");
        }
      }

      // 3. Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      data.password = hashedPassword;

      // 4. Create user
      const response = await UserRepository.createUser(data);
      return response;
    } catch (error) {
      console.log("Error at User Service layer", error);
      throw error;
    }
  }

  async login(data) {
    try {
      const user = await UserRepository.findUserByEmail(data.email);
      if (!user) {
        throw new Error("User not found with this email");
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // return token to controller
      return { token, user };
    } catch (error) {
      console.log("Error at User Service layer - login");
      throw error;
    }
  }
}

module.exports = new UserService();
