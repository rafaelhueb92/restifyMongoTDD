const mongoose = require("mongoose");
const env = require("../config/env.js");
const options = { useNewUrlParser: true };

module.exports = {
  openConnection() {
    return mongoose
      .connect(env.mongooseConnection, options)
      .then(() => console.log("MongoDb Connected"))
      .catch(err => {
        throw err;
      });
  },
  closeConnection() {
    return mongoose
      .disconnect()
      .then(() => console.log("MongoDb Disconnected"))
      .catch(err => console.log(err));
  },
  execute(action) {
    return this.openConnection()
      .then(() => action)
      .then(result => {
        this.closeConnection();
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  list(model) {
    return this.execute(model.find({})).catch(err => {
      throw err;
    });
  },

  findById(model, id) {
    return this.execute(model.findById({ _id: id })).catch(err => {
      throw err;
    });
  },

  insert(Model, arg) {
    return this.execute(new Model(arg).save()).catch(err => {
      throw err;
    });
  },

  update(model, arg) {
    return this.execute(
      model
        .findById(arg._id)
        .then(modelFind => depareObjects(model, modelFind))
        .then(deparedObject => new User(deparedObject).save())
    ).catch(err => {
      throw err;
    });
  },
  del(model, id) {
    return this.execute(
      model.remove(
        { _id: id },
        err =>
          new Promise((resolve, reject) => {
            if (err) throw reject(err);
            else return resolve({ deleted: true });
          })
      ),
      res
    ).catch(err => {
      throw err;
    });
  }
};
