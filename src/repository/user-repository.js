const { User } = require("../models");

class UserRepository {
  async createUser(data) {
    try {
      return await User.create(data);
    } catch (error) {
      console.log("Error in user repo", error);
      throw error;
    }
  }
  async findUserByEmail(email) {
    try {
      return await User.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log("Error in user repo", error);
      throw error;
    }
  }
}
module.exports = new UserRepository();
