import express from "express";
import { graphqlHTTP } from "express-graphql";
const app = express();
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const books = [
  {
    id: 1,
    name: "Book1",
  },
  { id: 2, name: "Book2" },
];

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Describes a product",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name };
        books.push(book);
        return book;
      },
    },
    addProduct: {
      type: ProductType,
      description: "Add a Product",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const product = { id: products.length + 1, name: args.name };
        products.push(product);
        return product;
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
    book: {
      type: BookType,
      description: "A Books",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: () => products,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation:RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(8080, () => console.log("Server Running"));
