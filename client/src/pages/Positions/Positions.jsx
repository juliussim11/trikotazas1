import React, { useEffect, useState } from "react";
import FilterUpdate from "../../components/FilterUpdate/FilterUpdate";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Positions.scss";
import axios from "axios";

const Positions = () => {
  const [listOfPositions, setListOfPositions] = useState([]);
  const [updatedPosition, setUpdatedPosition] = useState({
    title: "",
  });
  const [position, setPosition] = useState({
    title: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setListOfPositions(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosition({
      ...position,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/positions", position, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setListOfPositions([...listOfPositions, response.data]);
      });
    setPosition({
      title: "",
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/positions/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Deleted");
        setListOfPositions(
          listOfPositions.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const handleUpdate = async (id) => {
    axios
      .put(`http://localhost:5000/positions/${id}`, updatedPosition, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Updated");
      });
  };

  return (
    <div className="positions">
      <FilterForm
        title="ADD POSITION"
        handleSubmit={handleSubmit}
        button="ADD POSITION"
        inputName="title"
        inputPlaceholder="position"
        inputValue={position.title}
        onChange={handleChange}
      />
      <div className="filter">
        {listOfPositions.length > 0 &&
          listOfPositions.map((position) => (
            <FilterUpdate
              key={position.id}
              initialValue={position.title}
              name="title"
              setFilterData={setUpdatedPosition}
              handleUpdate={() => {
                handleUpdate(position.id);
              }}
              handleDelete={() => {
                handleDelete(position.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Positions;
