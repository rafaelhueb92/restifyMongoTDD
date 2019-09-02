const { PubSub } = require("graphql-subscriptions");
const { gql } = require("apollo-server");
const fs = require("fs");
const User = require("../core/db/models/user");
const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = "Nova Notificação";
const db = require("../core/db/models");
const { depareObjects } = require("../core/utils/objects");

db.abrirConexao().catch(error => console.log(error));

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;

const resolvers = {
  Query: {
    User: (_, id) => User.findById(id),
    Users: () => User.find({})
  },
  Mutation: {
    incluirUser: (_, { include }) =>
      new User(include).save().then(user =>
        pubsub
          .publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
            newNotification: user
          })
          .then(() => user)
      ),
    alterarUser: (_, { alter }) =>
      User.findById(args.id).then(result =>
        depareObjects(alter)
          .then(userAlter => new User(userAlter).save())
          .then(userAltered => {
            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
              subStr: JSON.stringify(User)
            });
            return userAltered;
          })
      ),
    excluirUser: (_, args) =>
      User.remove({ _id: args.id }, err => {
        if (err) throw err;
        else {
          const subStr = args.id.toString();
          pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { subStr });
          return `User id ${args.id} excluído com sucesso!`;
        }
      })
  },
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator([NOTIFICATION_SUBSCRIPTION_TOPIC])
    }
  }
};

module.exports = { typeDefs, resolvers };
