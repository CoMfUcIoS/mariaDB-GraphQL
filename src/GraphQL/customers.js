import { GraphQLModule } from "@graphql-modules/core";
import { gql } from "apollo-server-express";

import * as db from "../db";

const customers = new GraphQLModule({
  typeDefs: gql`
    extend type Query {
      customers: [customer]
      customer(customer_id: ID!): customer
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
  },
});

export default customers;
