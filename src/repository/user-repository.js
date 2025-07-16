const { User } = require('../models');

class UserRepository {
    async createUser(data){
        return await User.create(data);
    }
    async findUserByEmail(email){
        return await User.findOne({
            where : {
                email
            }
        });
    }

}
module.exports= new UserRepository();