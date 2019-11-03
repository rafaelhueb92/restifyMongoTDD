const User = require("../db/models/user");

class userService {
    list() {
      return User.list().catch(err => {
        throw err;
      });
    }
    findById(id) {
      return User.findById(id).catch(err => {
        throw err;
      });
    }
    insert(arg) {
      return User.insert(arg).catch(err => {
        throw err;
      });
    }
    update(arg) {
      return User.update(arg).catch(err => {
        throw err;
      });
    }
    del(id) {
      return User.del(id).catch(err => {
        throw err;
      });
    }
  } 

module.exports = new userService();
