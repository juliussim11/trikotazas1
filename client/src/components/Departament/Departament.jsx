import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Departament.scss";
import axios from "axios";

const Departament = ({ value, id }) => {
  const [departamentData, setDepartamentData] = useState({
    title: value,
  });

  console.log(departamentData);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/departaments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Deleted");
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/departaments/${id}`, departamentData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Updated");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartamentData({
      ...departamentData,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        name="title"
        value={departamentData.title}
        onChange={handleChange}
      />
      <button onClick={handleDelete}>DELETE</button>
      <button onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};

Departament.propTypes = {
  value: PropTypes.string,
  id: PropTypes.node,
};

export default Departament;
