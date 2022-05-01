import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownOption from "./DropdownOption/DropdownOption";
import "./DropdownFilter.scss";

const DropdownFilter = ({ title, filters, ...props }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const onChange = (e) => {
    setSelectedFilter(e.target.value || null);
    props.setSelectedFilter(e.target.value || null);
  };

  console.log("FILTERS: ", filters);
  console.log("SELECTED FILTER: ", selectedFilter);

  return (
    <div className="dropdown">
      <div className="dropdown__title">{title}</div>
      <select value={selectedFilter || ""} onChange={onChange}>
        <option value="">-----</option>
        {filters.map((filter) => (
          <DropdownOption
            key={filter.id}
            value={filter.id}
            optionName={filter.title}
          />
        ))}
      </select>
    </div>
  );
};

DropdownFilter.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
};

export default DropdownFilter;
