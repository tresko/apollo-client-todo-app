import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      completed
      title
    }
  }
`;

const TODOS_QUERY = gql`
  query GetAllTodos {
      todos {
          id
          completed
          title
      }
  }
`;

const AddTodo = () => (
  <Mutation mutation={ADD_TODO} /*refetchQueries={[{ query: TODOS_QUERY }]}*/>
    {addTodo => {
      let input;
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!input.value.trim()) {
                return;
              }
              addTodo({
                variables: { title: input.value },
                optimisticResponse: {
                  __typename: "Mutation",
                  addTodo: {
                    id: '-1',
                    title: input.value,
                    completed: false,
                    __typename: 'Todo',
                  },
                },
                update: (proxy, { data: { addTodo } }) => {
                  // Read the data from our cache for this query.
                  const data = proxy.readQuery({ query: TODOS_QUERY });
                  // Add our comment from the mutation to the end.
                  data.todos.push(addTodo);
                  console.log(data);
                  // Write our data back to the cache.
                  proxy.writeQuery({ query: TODOS_QUERY, data });
                }
              });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      );
    }}
  </Mutation>
);

export default AddTodo;
