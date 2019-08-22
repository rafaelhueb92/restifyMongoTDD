const routerInstance = require("./routes");
const restify = require("restify");

class AppController {
  constructor() {
    this.server = server = restify.createServer({
      name: "node-TDD",
      version: "1.0.0"
    });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(restify.acceptParser(server.acceptable));
    this.server.use(restify.queryParser());
    this.server.use(restify.CORS());
    this.server.use(restify.fullResponse());
    this.server.use(restify.bodyParser());
  }

  routes() {
    routerInstance.applyRoutes(this.server);
  }
}

module.exports = new AppController().server;
