const user = require("../db/models/user");

class userService {
  list() {
    return user.list().catch(err => {
      throw err;
    });
  }
  findById(id) {
    return user.findById(id).catch(err => {
      throw err;
    });
  }
  findOne(args) {
    return user.findOne(args).catch(err => {
      throw err;
    });
  }
  insert(arg) {
    return user.insert(arg).catch(err => {
      throw err;
    });
  }
  update(arg) {
    return user.update(arg).catch(err => {
      throw err;
    });
  }
  del(id) {
    return user.del(id).catch(err => {
      throw err;
    });
  }
}

module.exports = new userService();
