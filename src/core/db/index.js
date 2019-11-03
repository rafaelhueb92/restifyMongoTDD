const mongoose = require("mongoose");
const options = { useNewUrlParser: true };
let instance = null;
require("dotenv/config");

class db {
  openConnection() {
    return mongoose
      .connect(process.env.MONGO_URL, options)
      .then(() => console.log("MongoDb Connected"))
      .catch(err => {
        throw err;
      });
  }

  closeConnection() {
    return mongoose
      .disconnect()
      .then(() => console.log("MongoDb Disconnected"))
      .catch(err => console.log(err));
  }

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
  }
}

module.exports = instance ? instance : new db();
