import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import * as VisibilityFilters from "../constants/visibilityFilterEnum";
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const TODOS_QUERY = gql`
  query GetAllTodos {
      todos {
          id
          completed
          title
      }
      visibilityFilter @client
  }
`;

const TOGGLE_TODO_MUTATION = gql`
  mutation ToggleTodo($id: String!) {
      toggleTodo(id: $id) {
        id
        completed
      }
  } 
`;

const VisibleTodoList = () => (
  <Query query={TODOS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <Mutation mutation={TOGGLE_TODO_MUTATION}>
          {(toggleTodo) => (
            <TodoList
              todos={getVisibleTodos(data.todos, data.visibilityFilter)}
              toggleTodo={toggleTodo}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default VisibleTodoList;
