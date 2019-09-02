const mongoose = require("mongoose");
const env = require("../config/env.js");

const options = { useNewUrlParser: true };
const openConnection = () =>
  mongoose
    .connect(env.mongooseConnection, options)
    .catch(err => console.log(err))
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.log(err));
const closeConnection = () =>
  mongoose
    .disconnect()
    .then(() => console.log("MongoDb Disconnected"))
    .catch(err => console.log(err));

module.exports = { openConnection, closeConnection };
