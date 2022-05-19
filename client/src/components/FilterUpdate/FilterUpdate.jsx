import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FilterUpdate.scss";

const FilterUpdate = ({
  initialValue,
  handleDelete,
  handleUpdate,
  name,
  ...props
}) => {
  const [filterData, setFilterData] = useState({
    title: initialValue,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
    props.setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  return (
    <div className="update">
      <input name={name} value={filterData.title} onChange={handleChange} />
      <button onClick={handleDelete}>TRINTI</button>
      <button onClick={handleUpdate}>NAUJINTI</button>
    </div>
  );
};

FilterUpdate.propTypes = {
  initialValue: PropTypes.string,
  name: PropTypes.string,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  setFilterData: PropTypes.func,
};

export default FilterUpdate;
