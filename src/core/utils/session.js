const bcrypt = require("bcrypt"),

  comparePassword = function(candidatePassword, password) {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err) throw err;
      return isMatch;
    });
  };

module.exports = { comparePassword };
