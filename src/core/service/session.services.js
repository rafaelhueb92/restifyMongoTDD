const jwtToken = require("jsonwebtoken");

const User = require("../../core/db/models/user");
const { openConnection, closeConnection } = require("../../core/db");
const { comparePassword } = require("../utils/session");

module.exports = {
  store(email, password) {
    return openConnection().then(mongoose =>
      User.findOne({ email }).then(user => {
        closeConnection(mongoose);
        return !user
          ? { message: "User not found" }
          : !comparePassword(password)
          ? { message: "Incorrect password" }
          : {
              user,
              token: jwtToken.sign(user._id)
            };
      })
    );
  }
};
