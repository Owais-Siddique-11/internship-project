const dotenv = require('dotenv');
dotenv.config();
module.exports={
    PORT :process.env.PORT,
    SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS),
    ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
    JWT_SECRET:process.env.JWT_SECRET
}