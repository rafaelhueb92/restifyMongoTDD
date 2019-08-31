const User = require("../../core/db/models/user");
const { openConnection, closeConnection } = require("../../core/db");

class userController {
  execute(action, res) {
    return openConnection()
      .then(() => action)
      .then(result => {
        closeConnection();
        return res.json(result);
      })
      .catch(err => res.status(401).json(err));
  }

  list(_, res) {
    return this.execute(User.find({}), res);
  }

  findById(req, res) {
    const { id } = req.params;
    return this.execute(this.model.findById({ _id: id }), res);
  }

  insert(req, res) {
    return this.execute(new this.model({ ...req.data }).save(), res);
  }

  update(req, res) {
    return this.execute(
      this.model
        .findById(id)
        .then(result => depareObjects({ ...req.data }, result))
        .then(deparedObject => new this.model({ ...deparedObject }).save()),
      res
    );
  }

  delete(req, res) {
    const { id } = req.params;
    return this.execute(
      this.model.remove(
        { _id: id },
        err =>
          new Promise((resolve, reject) => {
            if (err) throw reject(err);
            else return resolve({ deleted: true });
          })
      ),
      res
    );
  }
}
module.exports = new userController();
