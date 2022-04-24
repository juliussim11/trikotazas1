import React, { useEffect, useState } from "react";
import Position from "../../components/Position/Position";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Positions.scss";
import axios from "axios";

const Positions = () => {
  const [listOfPositions, setListOfPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setListOfPositions(response.data);
    });
  }, []);

  const [position, setPosition] = useState({
    title: "",
  });

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
  return (
    <div>
      <FilterForm
        title="POSITION"
        handleSubmit={handleSubmit}
        button="ADD POSITION"
        inputName="title"
        inputPlaceholder="position"
        inputValue={position.title}
        onChange={handleChange}
      />
      <div>
        {listOfPositions.length > 0 &&
          listOfPositions.map((position) => (
            <Position
              key={position.id}
              id={position.id}
              value={position.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Positions;
