const User = require("../../core/db/models/user");
const { openConnection, closeConnection } = require("../../core/db");

class sessionController {
  store(req, res) {
    const { email, password } = req.body;
    console.log("Begin Session", email, password);
    return openConnection().then(mongoose =>
      User.findOne({ where: { email } }).then(user => {
        closeConnection(mongoose);
        return !user
          ? res.json({ message: "User not found" })
          : !User.comparePassword(password)
          ? res.json({ message: "Incorrect password" })
          : res.json({
              user,
              token: user.generateToken()
            });
      })
    );
  }
}

module.exports = new sessionController();
