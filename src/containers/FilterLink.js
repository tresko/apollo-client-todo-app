import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Link from "../components/Link";

const SET_VISIBILITY_FILTER_MUTATION = gql`
  mutation UpdateVisibilityFilter($visibilityFilter: VisibilityFilterEnum!) {
    updateVisibilityFilter(visibilityFilter: $visibilityFilter) @client
  }
`;

const VISIBILITY_FILTER_QUERY = gql`
  query visibilityFilterQuery {
    visibilityFilter
  }
`;

const propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired
};

const FilterLink = ({ children, filter }) => (
  <Query query={VISIBILITY_FILTER_QUERY}>
    {({ data }) => (
      <Mutation mutation={SET_VISIBILITY_FILTER_MUTATION}>
        {setVisibilityFilter => (
          <Link
            onClick={() =>
              setVisibilityFilter({ variables: { visibilityFilter: filter } })
            }
            active={data.visibilityFilter === filter}
          >
            {children}
          </Link>
        )}
      </Mutation>
    )}
  </Query>
);

FilterLink.propTypes = propTypes;

export default FilterLink;
