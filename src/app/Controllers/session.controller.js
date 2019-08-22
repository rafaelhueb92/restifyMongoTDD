const { User } = require("../../core/db/models/user");

class sessionController {
   store(req, res) {
    const { email, password } = req.body;

    return User.findOne({ where: { email } }).then(user => 
         (!user) ? res.status(401).json({ message: "User not found" }) : 
         (!(await user.checkPassword(password))) ?
           res.status(401).json({ message: "Incorrect password" }) :
           res.json({
            user,
            token: user.generateToken()
          })
    )

  }
}

module.exports = new sessionController();
