import React, { useEffect, useState } from "react";
import FilterUpdate from "../../components/FilterUpdate/FilterUpdate";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Departaments.scss";
import axios from "axios";

const Departaments = () => {
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [updatedDepartament, setUpdatedDepartament] = useState({
    title: "",
  });
  const [departament, setDepartament] = useState({
    title: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/departaments").then((response) => {
      setListOfDepartaments(response.data);
    });
  }, []);

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

  const handleDelete = (id) => {
    if (window.confirm("Ar tikrai norite ištrinti skyrių?")) {
      axios
        .delete(`http://localhost:5000/departaments/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          alert("Skyrius ištrintas");
          setListOfDepartaments(
            listOfDepartaments.filter((val) => {
              return val.id != id;
            })
          );
        });
    } else {
      return;
    }
  };

  const handleUpdate = async (id) => {
    axios
      .put(`http://localhost:5000/departaments/${id}`, updatedDepartament, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Skyrius atnaujintas");
      });
  };

  return (
    <div className="departaments">
      <FilterForm
        title="PRIDĖTI SKYRIŲ"
        handleSubmit={handleSubmit}
        button="PRIDĖTI"
        inputName="title"
        inputPlaceholder="skyrius"
        inputValue={departament.title}
        onChange={handleChange}
      />
      <div className="filter">
        {listOfDepartaments.length > 0 &&
          listOfDepartaments.map((departament) => (
            <FilterUpdate
              key={departament.id}
              initialValue={departament.title}
              name="title"
              setFilterData={setUpdatedDepartament}
              handleUpdate={() => {
                handleUpdate(departament.id);
              }}
              handleDelete={() => {
                handleDelete(departament.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Departaments;
