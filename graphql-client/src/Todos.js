import React, { useState,useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query Query {
    todos {
      id
      task
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($task: String!) {
    addTodo(task: $task) {
      task
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      task
    }
  }
`;

const Todos = () => {
  const [task, setTask] = useState();
  const { loading, error, data, refetch } = useQuery(TODOS_QUERY);
const tsk = useRef()
  const [addTodo] = useMutation(ADD_TODO, {
    variables: { task: task },
  });

  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Todo App</h2>
      <input
        type="text" ref={tsk}
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <button
        onClick={() => {
          addTodo();
          tsk.current.value=""
          refetch();
        }}
      >
        Add
      </button>

      {data.todos.map((todo) => (
        <div key={todo.id}>
          {todo.task}
          <button
            onClick={() => {
              deleteTodo({
                variables: { id: todo.id },
              });
              refetch();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
