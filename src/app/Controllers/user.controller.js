const User = require("../../core/service/user.service");

module.exports = {
  
  list(_, res) {
    return User.list()
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  findById(req, res) {
    const { id } = req.params;
    return User.findById(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  insert(req, res) {
    return User.insert(req.body)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  update(req, res) {
    return User.update(req.body)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  },

  delete(req, res) {
    const { id } = req.params;
    return User.delete(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }

};
