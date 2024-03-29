import React, { useEffect, useState } from "react";
import FilterUpdate from "../../components/FilterUpdate/FilterUpdate";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Programs.scss";
import axios from "axios";

const Programs = () => {
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [updatedProgram, setUpdatedProgram] = useState({
    title: "",
  });
  const [program, setProgram] = useState({
    title: "",
  });
  console.log("UPDATE DATA: ", updatedProgram);

  useEffect(() => {
    axios.get("http://localhost:5000/programs").then((response) => {
      setListOfPrograms(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({
      ...program,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/programs", program, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setListOfPrograms([...listOfPrograms, response.data]);
      });
    setProgram({
      title: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Ar tikrai norite ištrinti programą?")) {
      axios
        .delete(`http://localhost:5000/programs/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          alert("Programa ištrinta");
          setListOfPrograms(
            listOfPrograms.filter((val) => {
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
      .put(`http://localhost:5000/programs/${id}`, updatedProgram, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Programa atnaujinta");
      });
  };

  return (
    <div className="programs">
      <FilterForm
        title="PRIDĖTI PROGRAMĄ"
        handleSubmit={handleSubmit}
        button="PRIDĖTI"
        inputName="title"
        inputPlaceholder="programa"
        inputValue={program.title}
        onChange={handleChange}
      />
      <div className="filter">
        {listOfPrograms.length > 0 &&
          listOfPrograms.map((program) => (
            <FilterUpdate
              key={program.id}
              initialValue={program.title}
              name="title"
              setFilterData={setUpdatedProgram}
              handleUpdate={() => {
                handleUpdate(program.id);
              }}
              handleDelete={() => {
                handleDelete(program.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Programs;
