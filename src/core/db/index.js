const mongoose = require("mongoose");
const env = require("../config/env.js");
const { depareObjects } = require("../utils/objects");
const options = { useNewUrlParser: true };

const openConnection = () =>
  mongoose
    .connect(env.mongooseConnection, options)
    .then(() => console.log("MongoDb Connected"))
    .catch(err => {
      throw err;
    });

const closeConnection = () =>
  mongoose
    .disconnect()
    .then(() => console.log("MongoDb Disconnected"))
    .catch(err => console.log(err));

const execute = action =>
  openConnection()
    .then(() => action)
    .then(result => {
      closeConnection();
      return result;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

module.exports = {
  openConnection,
  closeConnection,
  execute,

  list(model) {
    return execute(model.find({})).catch(err => {
      throw err;
    });
  },

  findById(model, id) {
    return execute(model.findById({ _id: id }))
      .then(res => res[0])
      .catch(err => {
        throw err;
      });
  },

  insert(Model, arg) {
    return execute(new Model(arg).save()).catch(err => {
      throw err;
    });
  },

  update(model, arg) {
    return execute(
      model
        .findById(arg._id)
        .then(modelFind => depareObjects(model, modelFind))
        .then(deparedObject => new User(deparedObject).save())
    ).catch(err => {
      throw err;
    });
  },
  del(model, id) {
    return execute(
      model.remove(
        { _id: id },
        err =>
          new Promise((resolve, reject) => {
            if (err) throw reject(err);
            else return resolve({ deleted: true });
          })
      )
    ).catch(err => {
      throw err;
    });
  }
};
