import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";
import FilterCheckBox from "../../components/FilterCheckBox/FilterCheckBox";
import axios from "axios";

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState({});

  const [listOfPositions, setListOfPositions] = useState([]);
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [newListOfPrograms, setNewListOfPrograms] = useState([]);
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [checkedPrograms, setCheckedPrograms] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/byId/${id}`).then((response) => {
      setQuestionData(response.data);
    });
    axios.get("http://localhost:5000/positions").then((response) => {
      setListOfPositions(response.data);
    });
    axios.get("http://localhost:5000/programs").then((response) => {
      setListOfPrograms(response.data);
    });
    axios
      .get(`http://localhost:5000/questions/${id}/programs`)
      .then((response) => {
        setCheckedPrograms(response.data);
      });
    axios.get("http://localhost:5000/departaments").then((response) => {
      setListOfDepartaments(response.data);
    });
  }, []);

  useEffect(() => {
    const programList = listOfPrograms.map((program) => {
      if (checkedPrograms.includes(program.id)) {
        program.checked = true;
        return program;
      } else {
        program.checked = false;
        return program;
      }
    });
    setNewListOfPrograms(programList);
  }, [checkedPrograms]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/questions/${id}`, questionData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Question Updated");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };
  console.log("POST DATA: ", questionData);

  // FILTERS !!!!!!!!!!!!!!!!!!!

  const onProgramCheck = (identificator) => {
    console.log("PROGRAM ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/add/${id}/program/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onProgramUncheck = (identificator) => {
    console.log("PROGRAM ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/delete/${id}/program/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  // const onPositionCheck = (id) => {
  //   setQuestionData({
  //     ...questionData,
  //     PositionId: [...questionData.PositionId, id],
  //   });
  //   props.setQuestionData({
  //     ...questionData,
  //     PositionId: [...questionData.PositionId, id],
  //   });
  // };

  // const onPositionUncheck = (id) => {
  //   setQuestionData({
  //     ...questionData,
  //     PositionId: questionData.PositionId.filter((posId) => posId !== id),
  //   });
  //   props.setQuestionData({
  //     ...questionData,
  //     PositionId: questionData.PositionId.filter((posId) => posId !== id),
  //   });
  // };

  // const onDepartamentCheck = (id) => {
  //   setQuestionData({
  //     ...questionData,
  //     DepartamentId: [...questionData.DepartamentId, id],
  //   });
  //   props.setQuestionData({
  //     ...questionData,
  //     DepartamentId: [...questionData.DepartamentId, id],
  //   });
  // };

  // const onDepartamentUncheck = (id) => {
  //   setQuestionData({
  //     ...questionData,
  //     DepartamentId: questionData.DepartamentId.filter((depId) => depId !== id),
  //   });
  //   props.setQuestionData({
  //     ...questionData,
  //     DepartamentId: questionData.DepartamentId.filter((depId) => depId !== id),
  //   });
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="question"
          value={questionData.question}
          onChange={handleChange}
        />
        <textarea
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
        />
        <div className="checkbox-wrapper">
          <div className="checkbox-wrapper__row">
            <div className="checkbox-wrapper__row__column">
              <h4>PROGRAMOS</h4>
              {newListOfPrograms.length > 0 &&
                newListOfPrograms.map((program) => (
                  <FilterCheckBox
                    title={program.title}
                    name={program.title}
                    id={program.id}
                    key={program.id}
                    onCheck={onProgramCheck}
                    onUncheck={onProgramUncheck}
                    checked={program.checked}
                  />
                ))}
            </div>
            <div className="checkbox-wrapper__row__column">
              <h4>PAREIGOS</h4>
              {listOfPositions.length > 0 &&
                listOfPositions.map((position) => (
                  <FilterCheckBox
                    title={position.title}
                    name={position.title}
                    key={position.id}
                    id={position.id}
                    //onCheck={onPositionCheck}
                    //onUncheck={onPositionUncheck}
                  />
                ))}
            </div>
            <div className="checkbox-wrapper__row__column">
              <h4>DEPARTAMENTAS</h4>
              {listOfDepartaments.length > 0 &&
                listOfDepartaments.map((departament) => (
                  <FilterCheckBox
                    title={departament.title}
                    name={departament.title}
                    key={departament.id}
                    id={departament.id}
                    //onCheck={onDepartamentCheck}
                    //onUncheck={onDepartamentUncheck}
                  />
                ))}
            </div>
          </div>
        </div>
        <button>UPDATE</button>
      </form>
    </>
  );
};

export default QuestionPage;
