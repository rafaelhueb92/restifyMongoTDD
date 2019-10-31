const { depareObjects } = require("../utils/objects");
const db = require("./");

class repo {
  constructor(model) {
    this.model = model;
  }

  list() {
    return db.execute(this.model.find({})).catch(err => {
      throw err;
    });
  }

  findById(id) {
    return db
      .execute(this.model.findById({ _id: id }))
      .then(res => res[0])
      .catch(err => {
        throw err;
      });
  }

  findOne(args) {
    return db
      .execute(this.model.findOne(args))
      .then(res => res)
      .catch(err => {
        throw err;
      });
  }

  insert(arg) {
    return db.execute(new this.model(arg).save()).catch(err => {
      throw err;
    });
  }

  update(arg) {
    return db
      .execute(
        this.model
          .findById(arg._id)
          .then(modelFind => depareObjects(arg, modelFind))
          .then(deparedObject => new this.model(deparedObject).save())
      )
      .catch(err => {
        throw err;
      });
  }

  del(id) {
    return db
      .execute(
        this.model.remove(
          { _id: id },
          err =>
            new Promise((resolve, reject) => {
              if (err) throw reject(err);
              else return db.resolve({ deleted: true });
            })
        )
      )
      .catch(err => {
        throw err;
      });
  }
}

module.exports = model => new repo(model);
