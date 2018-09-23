import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

const Todo = ({ onClick, completed, title }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {title}
  </li>
);

Todo.propTypes = propTypes;

export default Todo;
