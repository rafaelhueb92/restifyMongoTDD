const jwtToken = require("jsonwebtoken");

const User = require("../../core/db/models/user");
const { comparePassword } = require("../utils/session");

module.exports = {
  store(email, password) {
    return User.findOne({ email }).then(user => !user
          ? { message: "User not found" }
          : !comparePassword(password)
          ? { message: "Incorrect password" }
          : {
              user,
              token: jwtToken.sign(user._id)
            }
      )
      }
};
