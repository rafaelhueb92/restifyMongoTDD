const express = require("express");
const bodyParser = require("body-parser-graphql");
const cors = require("cors");
const { resolvers, typeDefs } = require("./resolve");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");

class AppController {
  constructor() {
    this.httpServer;
    this.server = new ApolloServer({
      resolvers,
      typeDefs
    });
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use("*", cors());
    this.app.use("/graphql", bodyParser.graphql());
    this.server.applyMiddleware({
      app: this.app
    });
    this.httpServer = http.createServer(this.app);
    this.server.installSubscriptionHandlers(this.httpServer);
  }
}

module.exports = new AppController().httpServer;
