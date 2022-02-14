import { makeExecutableSchema } from "@graphql-tools/schema";
import customers from "GraphQL/customers";
import { ApolloServer, gql } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import listenMysqlChanges from "liveMariaDB/";
import { merge } from "lodash";
import { SubscriptionServer } from "subscriptions-transport-ws";
const app = express();
const httpServer = createServer(app);

const pubsub = new PubSub();

const { typeDefs: customer, resolvers: customerResolvers } = customers(pubsub);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Subscription = gql`
  type Subscription {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, Subscription, customer],
  resolvers: merge(customerResolvers),
});

const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: "/graphql" },
);

let server;

(async () => {
  try {
    server = new ApolloServer({
      playground: true,
      schema,
      plugins: [
        {
          async serverWillStart() {
            listenMysqlChanges(["customers"], pubsub);
            return {
              async drainServer() {
                subscriptionServer.close();
              },
            };
          },
        },
      ],
    });

    await server.start();
    server.applyMiddleware({ app });

    app.get("/", (req, res) => res.send("Hello World!"));

    httpServer.listen({ port: 5003 }, () =>
      console.log(`🚀 Server ready at http://localhost:5003`),
    );
  } catch (e) {
    // Deal with the fact the chain failed
    console.log(e);
  }
})();
