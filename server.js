const dotenv = require('"dotenv');

dotenv.config()

console.log("my password is : " + process.env.MY_PASSWORD);