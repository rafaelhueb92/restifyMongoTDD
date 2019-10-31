const jwt = require("jsonwebtoken");
const User = require("../../core/db/models/user");
require("dotenv/config");

class sessionController {
  store({ body }, res) {
    const { email, password } = body;
    return User.findOne({ email }).then(user =>
      !user
        ? res.json({ message: "User not found" })
        : !User.model.comparePassword(password)
        ? res.json({ message: "Incorrect password" })
        : res.json({
            user,
            token: jwt.sign(user, process.env.JWT_KEY)
          })
    );

    /*return openConnection().then(mongoose =>
      User.findOne({ email }).then(user => {
        closeConnection(mongoose);
        return !user
          ? res.json({ message: "User not found" })
          : !User.comparePassword(password)
          ? res.json({ message: "Incorrect password" })
          : res.json({
              user,
              token: jwt.sign(user, process.env.JWT_KEY)
            });
      })
    ); */
  }
}

module.exports = new sessionController();
