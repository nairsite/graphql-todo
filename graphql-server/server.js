import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/index.js";
import cors from 'cors'
import mongoose from "mongoose";
const app = express();
app.use(cors())

app.use(
  "/graphql/",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/socialdb1")
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.listen(8080, () => console.log("Server Running"));
