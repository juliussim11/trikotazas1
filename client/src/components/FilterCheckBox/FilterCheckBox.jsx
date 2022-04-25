import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterCheckBox = ({ title, name, id, ...props }) => {
  const [filterChecked, setFilterChecked] = useState(false);
  console.log("CHECKED FILTER: ", filterChecked);

  return (
    <div>
      {title}
      <input
        type="checkbox"
        checked={filterChecked}
        name={name}
        id={id}
        onChange={() => {
          if (!filterChecked) {
            setFilterChecked(true);
            props.onCheck(id);
          } else {
            setFilterChecked(false);
            props.onUncheck(id);
          }
        }}
      />
    </div>
  );
};

FilterCheckBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.node,
  checkFilterTitle: PropTypes.string,
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func,
};

export default FilterCheckBox;
