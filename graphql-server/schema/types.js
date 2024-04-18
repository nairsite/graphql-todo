import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
  } from "graphql";
  
export const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
    }),
  });
  
  
export const ProductType = new GraphQLObjectType({
    name: "Product",
    description: "Describes a product",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) },
    }),
  });

  export const TodoType = new GraphQLObjectType({
    name: "Todo",
    description: "This represents a todo",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLString) },
      task: { type: GraphQLNonNull(GraphQLString) },
    }),
  });