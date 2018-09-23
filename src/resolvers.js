export const defaults = {
  visibilityFilter: "SHOW_ALL"
};

export const resolvers = {
  Mutation: {
    updateVisibilityFilter: (_, {visibilityFilter}, {cache}) => {
      const data = {
        visibilityFilter,
        __typename: "VisibilityxFilter"
      };
      cache.writeData({data});
      return null;
    },
  },
};
