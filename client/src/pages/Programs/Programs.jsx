import React, { useEffect, useState } from "react";
import Program from "../../components/Program/Program";
import FilterForm from "../../components/FilterForm/FilterForm";
import "./Programs.scss";
import axios from "axios";

const Programs = () => {
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [updateProgram, setUpdateProgram] = useState({
    title: "",
  });
  console.log("UPDATE DATA: ", updateProgram);

  useEffect(() => {
    axios.get("http://localhost:5000/programs").then((response) => {
      setListOfPrograms(response.data);
    });
  }, []);

  const [program, setProgram] = useState({
    title: "",
  });

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
    axios
      .delete(`http://localhost:5000/programs/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Deleted");
        setListOfPrograms(
          listOfPrograms.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const handleUpdate = async (id) => {
    axios
      .put(`http://localhost:5000/programs/${id}`, updateProgram, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Program Updated");
      });
  };

  return (
    <div>
      <FilterForm
        title="PROGRAM"
        handleSubmit={handleSubmit}
        button="ADD PROGRAM"
        inputName="title"
        inputPlaceholder="program"
        inputValue={program.title}
        onChange={handleChange}
      />
      <div>
        {listOfPrograms.length > 0 &&
          listOfPrograms.map((program) => (
            <Program
              key={program.id}
              id={program.id}
              value={program.title}
              name="title"
              //   handleChange={(programData) => setUpdateProgram(programData)}
              handleUpdate={(programData) => {
                setUpdateProgram(programData);
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
