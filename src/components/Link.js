import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

const Link = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: "4px"
    }}
  >
    {children}
  </button>
);

Link.propTypes = propTypes;

export default Link;
