const express = require("express");
const bodyParser = require("body-parser-graphql");
const cors = require("cors");
const { resolvers, typeDefs } = require("./resolve");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");

class AppController {
  constructor() {
    this.server = new ApolloServer({
      resolvers,
      typeDefs
    });
    this.app = express();
    this.httpServer;
    this.middlewares();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.app.use("*", cors({ origin: `http://localhost:3000` }));
    this.app.use("/graphql", bodyParser.graphql());
    this.server.applyMiddleware({
      app
    });
    this.httpServer = http.createServer(app);
    this.server.installSubscriptionHandlers(httpServer);
  }
}

module.exports = new AppController().httpServer;
