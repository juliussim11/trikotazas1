import React, { useEffect, useState } from "react";
import Departament from "../../components/Departament/Departament";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Departaments.scss";
import axios from "axios";

const Departaments = () => {
  const [listOfDepartaments, setListOfDepartaments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/departaments").then((response) => {
      setListOfDepartaments(response.data);
    });
  }, []);

  const [departament, setDepartament] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartament({
      ...departament,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/departaments", departament, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setListOfDepartaments([...listOfDepartaments, response.data]);
      });
    setDepartament({
      title: "",
    });
  };
  return (
    <div>
      <FilterForm
        title="DEPARTAMENT"
        handleSubmit={handleSubmit}
        button="ADD DEPARTAMENT"
        inputName="title"
        inputPlaceholder="departament"
        inputValue={departament.title}
        onChange={handleChange}
      />
      <div>
        {listOfDepartaments.length > 0 &&
          listOfDepartaments.map((departament) => (
            <Departament
              key={departament.id}
              id={departament.id}
              value={departament.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Departaments;
