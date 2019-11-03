const bcrypt = require("bcrypt"),
  comparePassword = (candidatePassword, password) =>
    new Promise(resolve =>
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        if (err) throw err;
        console.log("util", isMatch);
        resolve(isMatch);
      })
    );

module.exports = { comparePassword };
