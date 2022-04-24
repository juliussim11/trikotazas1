import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Program.scss";
//import axios from "axios";

const Program = ({ value, id, handleDelete, name, ...props }) => {
  const [programData, setProgramData] = useState({
    title: value,
  });

  //   console.log(programData);

  //   const handleDelete = () => {
  //     axios
  //       .delete(`http://localhost:5000/programs/${id}`, {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then(() => {
  //         alert("Program Deleted");
  //       });
  //   };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();

  //     axios
  //       .put(`http://localhost:5000/programs/${id}`, programData, {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then(() => {
  //         alert("Program Updated");
  //       });
  //   };

  const handleUpdate = async (e) => {
    e.preventDefault();

    props.handleUpdate(programData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value,
    });
    // props.handleChange(programData);
  };

  return (
    <div>
      <input
        // name="title"
        name={name}
        // value={programData.title}
        value={programData.title}
        onChange={handleChange}
      />
      <button onClick={handleDelete}>DELETE</button>
      <button onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};

Program.propTypes = {
  value: PropTypes.string,
  id: PropTypes.node,
  name: PropTypes.string,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Program;
