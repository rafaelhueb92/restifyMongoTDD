const mongoose = require("mongoose");
const env = require("../config/.env.js");

const options = { useNewUrlParser: true };
const abrirConexao = () => mongoose.connect(env.mongooseConnection, options);
const fecharConexao = mongo => mongo.disconnect();

module.exports = { abrirConexao, fecharConexao };
