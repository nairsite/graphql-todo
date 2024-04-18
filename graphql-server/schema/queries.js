import { createTask, deleteTask, updateTask, getTasks } from '../controllers/todoController.js'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { BookType, ProductType, TodoType } from "./types.js";
import { books, products } from "./data.js";
import todoModel from "../models/todoModel.js";

export const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: () => getTasks(),
    },
    book: {
      type: BookType,
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
