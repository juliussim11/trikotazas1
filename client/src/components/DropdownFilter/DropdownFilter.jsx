import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownOption from "./DropdownOption/DropdownOption";

const DropdownFilter = ({ title, filters, ...props }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const onChange = (e) => {
    setSelectedFilter(e.target.value);
    props.setSelectedFilter(e.target.value);
  };

  console.log("FILTERS: ", filters);
  console.log("SELECTED FILTER: ", selectedFilter);

  return (
    <div>
      <div>{title}</div>
      <select value={selectedFilter} onChange={onChange}>
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
