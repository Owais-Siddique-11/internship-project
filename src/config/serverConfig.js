const dotenv = require('dotenv');
dotenv.config();
module.exports={
    PORT :process.env.PORT,
    SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS)
}