import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";
import FilterCheckBox from "../../components/FilterCheckBox/FilterCheckBox";
import axios from "axios";

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState({});

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
    axios.get("http://localhost:5000/departaments").then((response) => {
      setListOfDepartaments(response.data);
    });
  }, []);

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

  const [listOfPositions, setListOfPositions] = useState([]);
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [listOfDepartaments, setListOfDepartaments] = useState([]);

  const programIden = 3;

  const onProgramCheck = () => {
    // setQuestionData({
    //   ...questionData,
    //   ProgramId: [...questionData.ProgramId, id],
    // });
    // props.setQuestionData({
    //   ...questionData,
    //   ProgramId: [...questionData.ProgramId, id],
    // });
    // setQuestionProgram({
    //   ...questionProgram,
    //   ProgramId: id,
    // });
    axios
      .get(
        `http://localhost:5000/questions/questionprogram/${id}/${programIden}`,
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

  // const onProgramUncheck = (id) => {
  //   setQuestionData({
  //     ...questionData,
  //     ProgramId: questionData.ProgramId.filter((progId) => progId !== id),
  //   });
  //   props.setQuestionData({
  //     ...questionData,
  //     ProgramId: questionData.ProgramId.filter((progId) => progId !== id),
  //   });
  // };

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
              {listOfPrograms.length > 0 &&
                listOfPrograms.map((program) => (
                  <FilterCheckBox
                    checkFilterTitle="PROGRAMOS"
                    title={program.title}
                    name={program.title}
                    id={program.id}
                    key={program.id}
                    onCheck={onProgramCheck}
                    //onUncheck={onProgramUncheck}
                  />
                ))}
            </div>
            <div className="checkbox-wrapper__row__column">
              <h4>PAREIGOS</h4>
              {listOfPositions.length > 0 &&
                listOfPositions.map((position) => (
                  <FilterCheckBox
                    checkFilterTitle="PAREIGOS"
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
                    checkFilterTitle="DEPARTAMENTAI"
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
