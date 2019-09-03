const { PubSub } = require("graphql-subscriptions");
const { gql } = require("apollo-server");
const fs = require("fs");
const User = require("../core/service/user.service");
const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = "Nova Notificação";

const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;

const resolvers = {
  Query: {
    User: (_, id) => User.findById(id),
    Users: () => User.list()
  },
  Mutation: {
    incluirUser: (_, { include }) =>
      User.insert(include).then(userIncluded => {
        pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
          newNotification: userIncluded
        });
        return userIncluded;
      }),
    alterarUser: (_, { alter }) =>
      User.update(alter).then(userAltered => {
        pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
          subStr: JSON.stringify(userAltered)
        });
        return userAltered;
      }),
    excluirUser: (_, { id }) =>
      User.del(id).then(() => {
        const subStr = args.id.toString();
        pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { subStr });
        return `User id ${args.id} excluído com sucesso!`;
      })
  },
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator([NOTIFICATION_SUBSCRIPTION_TOPIC])
    }
  }
};

module.exports = { typeDefs, resolvers };
