const mongoose = require("mongoose");
const env = require("../config/env.js");

const options = { useNewUrlParser: true };
const openConnection = () => mongoose.connect(env.mongooseConnection, options);
const closeConnection = mongo => mongo.disconnect();

module.exports = { openConnection, closeConnection };
