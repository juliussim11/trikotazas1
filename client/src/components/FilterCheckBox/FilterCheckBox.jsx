import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FilterCheckBox.scss";

const FilterCheckBox = ({ title, name, id, checked, ...props }) => {
  const [filterChecked, setFilterChecked] = useState(checked);

  const onChange = () => {
    if (!filterChecked) {
      setFilterChecked(true);
      props.onCheck(id);
    } else {
      setFilterChecked(false);
      props.onUncheck(id);
    }
  };

  return (
    <div className="filter">
      <div>
        <span>{title}</span>
      </div>
      <div>
        <input
          type="checkbox"
          checked={filterChecked}
          name={name}
          id={id}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

FilterCheckBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.node,
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func,
  checked: PropTypes.bool,
};

export default FilterCheckBox;
