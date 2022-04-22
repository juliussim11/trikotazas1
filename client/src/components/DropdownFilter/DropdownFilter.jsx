import React from "react";
import PropTypes from "prop-types";
import "./DropdownFilter.scss";

const DropdownFilter = ({ handleChange, value, filters, title }) => {
  const filteredPrograma = [...new Set(filters.map((q) => q.programa))];
  const filteredSkyrius = [...new Set(filters.map((q) => q.skyrius))];
  const filteredPareigos = [...new Set(filters.map((q) => q.pareigos))];

  return (
    <div className="dropdown">
      <label>
        <div className="dropdown__title">{title}</div>
        <select
          value={value}
          onChange={handleChange}
          className="dropdown__field"
        >
          <option value="">---</option>
          {title === "Programa"
            ? filteredPrograma.map((filter, index) => (
                <option key={index} value={filter}>
                  {filter}
                </option>
              ))
            : ""}
          {title === "Skyrius"
            ? filteredSkyrius.map((filter, index) => (
                <option key={index} value={filter}>
                  {filter}
                </option>
              ))
            : ""}
          {title === "Pareigos"
            ? filteredPareigos.map((filter, index) => (
                <option key={index} value={filter}>
                  {filter}
                </option>
              ))
            : ""}
        </select>
      </label>
    </div>
  );
};

DropdownFilter.propTypes = {
  title: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  filters: PropTypes.any,
};

export default DropdownFilter;
