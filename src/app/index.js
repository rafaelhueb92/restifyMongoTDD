const restify = require("restify");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");

class AppController {
  constructor() {
    this.server = restify.createServer({
      name: "node-TDD",
      version: "1.0.0"
    });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }

  routes() {
    routes(this.server);
  }
}

module.exports = new AppController().server;
