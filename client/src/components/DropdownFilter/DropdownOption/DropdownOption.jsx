import React from "react";
import PropTypes from "prop-types";

const DropdownOption = ({ value, optionName }) => {
  return <option value={value}>{optionName}</option>;
};

DropdownOption.propTypes = {
  value: PropTypes.node,
  optionName: PropTypes.string,
};

export default DropdownOption;
