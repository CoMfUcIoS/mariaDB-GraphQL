import customers from "GraphQL/customers";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let server;

(async () => {
  try {
    server = new ApolloServer({
      playground: true,
      modules: [customers],
    });

    await server.start();
    server.applyMiddleware({ app });

    app.get("/", (req, res) => res.send("Hello World!"));

    app.listen({ port: 5003 }, () =>
      console.log(`🚀 Server ready at http://localhost:5003`),
    );
  } catch (e) {
    // Deal with the fact the chain failed
    console.log(e);
  }
})();
