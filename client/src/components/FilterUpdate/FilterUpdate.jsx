import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FilterUpdate.scss";
import DeleteIcon from "../../assets/delete_icon.svg";
import SaveIcon from "../../assets/check_icon.svg";

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
      <div className="update__action">
        <button onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete" />
        </button>
        <button onClick={handleUpdate}>
          <img src={SaveIcon} alt="Save" />
        </button>
      </div>
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
