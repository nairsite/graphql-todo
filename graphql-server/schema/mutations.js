import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { BookType, ProductType,TodoType } from "./types.js";
import { books, products } from "./data.js";
import { createTask, deleteTask } from "../controllers/todoController.js";
export const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addTodo: {
      type: TodoType,
      args: {
        task: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return createTask(args.task)

      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return deleteTask(args.id)

      },
    },
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
        price: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const product = {
          id: products.length + 1,
          name: args.name,
          price: args.price,
        };
        products.push(product);
        console.log(products);
        return product;
      },
    },
  }),
});
