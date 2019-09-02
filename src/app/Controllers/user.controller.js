const User = require("../../core/db/models/user");
const { depareObjects } = require("../../core/utils/objects");
const { openConnection, closeConnection } = require("../../core/db");

function execute(action, res) {
  return openConnection()
    .then(() => action)
    .then(result => {
      closeConnection();
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
      throw res.json(err);
    });
}

class userController {
  list(_, res) {
    return execute(User.find({}), res).catch(err => res.json(err));
  }

  findById(req, res) {
    const { id } = req.params;
    return execute(User.findById({ _id: id }), res).catch(err => res.json(err));
  }

  insert(req, res) {
    console.log("User", req.body);
    return execute(new User(req.body).save(), res).catch(err => res.json(err));
  }

  update(req, res) {
    return execute(
      User.findById(id)
        .then(result => depareObjects(req.body, result))
        .then(deparedObject => new User(deparedObject).save()),
      res
    ).catch(err => res.json(err));
  }

  delete(req, res) {
    const { id } = req.params;
    return execute(
      User.remove(
        { _id: id },
        err =>
          new Promise((resolve, reject) => {
            if (err) throw reject(err);
            else return resolve({ deleted: true });
          })
      ),
      res
    ).catch(err => res.json(err));
  }
}
module.exports = new userController();
