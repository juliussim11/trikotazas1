import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="button" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
