const User = require("../../core/db/models/user");
const { list, findById, insert, update, del } = require("../../core/db");

module.exports = {
  list() {
    return list(User).catch(err => {
      throw err;
    });
  },
  findById(id) {
    return findById(User, id).catch(err => {
      throw err;
    });
  },
  insert(arg) {
    return insert(User, arg).catch(err => {
      throw err;
    });
  },
  update(arg) {
    return update(User, arg).catch(err => {
      throw err;
    });
  },
  del(id) {
    return del(User, id).catch(err => {
      throw err;
    });
  }
};
