const express = require("express");
const bodyParser = require("body-parser-graphql");
const cors = require("cors");
const { resolvers, typeDefs } = require("./graphql/resolve");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const PORT = process.env.PORT || 4000;

class AppController {
  constructor() {
    this.server = new ApolloServer({
      resolvers,
      typeDefs
    });
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }
}

module.exports = new AppController().server;

app.use("*", cors({ origin: `http://localhost:3000` }));
app.use("/graphql", bodyParser.graphql());

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    "\n",
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
