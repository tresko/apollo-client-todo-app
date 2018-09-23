import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo({
          variables: { id: todo.id },
          optimisticResponse: {
            __typename: "Mutation",
            toggleTodo: {
              id: todo.id,
              completed: !todo.completed,
              __typename: 'Todo',
            },
          },
        })} />
    ))}
  </ul>
);

TodoList.propTypes = propTypes;

export default TodoList;
