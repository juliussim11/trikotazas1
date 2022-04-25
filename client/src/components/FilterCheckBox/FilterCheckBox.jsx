import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterCheckBox = ({ title, name, id, ...props }) => {
  const [filterChecked, setFilterChecked] = useState({
    id: id,
    checked: false,
  });

  const onChange = () => {
    if (!filterChecked.checked) {
      setFilterChecked({ ...filterChecked, checked: true });
      props.setFilterChecked({ ...filterChecked, checked: true });
    } else {
      setFilterChecked({ ...filterChecked, checked: false });
      props.setFilterChecked({ ...filterChecked, checked: false });
    }
  };
  console.log("CHECKED FILTER: ", filterChecked);

  return (
    <div>
      {title}
      <input
        type="checkbox"
        checked={filterChecked.checked}
        name={name}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

FilterCheckBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.node,
  checkFilterTitle: PropTypes.string,
  setFilterChecked: PropTypes.func,
  onChange: PropTypes.func,
};

export default FilterCheckBox;
