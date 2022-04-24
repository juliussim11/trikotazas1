import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Position.scss";
import axios from "axios";

const Position = ({ value, id }) => {
  const [positionData, setPositionData] = useState({
    title: value,
  });

  console.log(positionData);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/positions/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Position Deleted");
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/positions/${id}`, positionData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Position Updated");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPositionData({
      ...positionData,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        name="title"
        value={positionData.title}
        onChange={handleChange}
      />
      <button onClick={handleDelete}>DELETE</button>
      <button onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};

Position.propTypes = {
  value: PropTypes.string,
  id: PropTypes.node,
};

export default Position;
