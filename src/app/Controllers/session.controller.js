const jwt = require("jsonwebtoken");
const User = require("../../core/db/models/user");
const { comparePassword } = require("../../core/utils/session");
require("dotenv/config");
let instance = null;

class sessionController {
  store({ body }, res) {
    const { email, password } = body;
    return User.findOne({ email }).then(user => {
      if (!user) res.json({ message: "User not found" });
      else {
        comparePassword(password, user.password).then(matchPassword => {
          console.log("matchPassword", matchPassword);
          !matchPassword
            ? res.json({ message: "Incorrect password" })
            : res.json({
                user,
                token: jwt.sign({ id: user._id }, process.env.JWT_KEY)
              });
        });
      }
    });

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

module.exports = instance ? instance : (instance = new sessionController());
