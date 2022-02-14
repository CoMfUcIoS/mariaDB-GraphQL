import { gql } from "apollo-server-express";

import * as db from "../db";

const CUSTOMER_CREATED = "CUSTOMERS_CREATED";

const customers = pubsub => {
  return {
    typeDefs: gql`
      extend type Query {
        customers: [customer]
        customer(customer_id: ID!): customer
      }
      extend type Subscription {
        customerCreated: customer
      }
      type customer {
        customer_id: ID!
        email: String
        lastname: String
      }
    `,
    resolvers: {
      Query: {
        customers: async () => db.customers.findAll(),
        customer: async (obj, args, context, info) =>
          db.customers.findByPk(args.customer_id),
      },
      Subscription: {
        customerCreated: {
          subscribe: () => pubsub.asyncIterator([CUSTOMER_CREATED]),
        },
      },
    },
  };
};

export default customers;
