import React, { useState, useEffect } from "react";
import "./Administrator.scss";
import { Editor } from "@tinymce/tinymce-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopBar from "../../components/TopBar/TopBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import axios from "axios";
import { Link } from "react-router-dom";

const Administrator = () => {
  // QUESTIONS :
  const [questionData, setQuestionData] = useState({
    question: "",
    answer: "",
  });
  console.log("QUESTION DATA: ", questionData);
  const [listOfQuestions, setListOfQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/questions", questionData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
        setListOfQuestions([...listOfQuestions, response.data]);
      });
    resetUserInputs();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/questions/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Question Deleted");
        setListOfQuestions(
          listOfQuestions.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const resetUserInputs = () => {
    setQuestionData({
      question: "",
      answer: "",
      PositionId: [],
      ProgramId: [],
      DepartamentId: [],
    });
  };

  const [listOfPositions, setListOfPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  console.log("SELETED POSITION: ", selectedPosition);
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  console.log("SELETED PROGRAM: ", selectedProgram);
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState("");
  console.log("SELETED DEPARTAMENT: ", selectedDepartament);

  // GET DATA FROM DB :
  useEffect(() => {
    axios.get("http://localhost:5000/questions").then((response) => {
      setListOfQuestions(response.data);
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
  console.log(listOfQuestions);

  return (
    <>
      <TopBar />
      <div className="links">
        <div className="links__wrapper">
          <Link to={`/positions`}>
            <h2>POSITIONS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/programs`}>
            <h2>PROGRAMS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/departaments`}>
            <h2>DEPARTAMENTS</h2>
          </Link>
        </div>
      </div>
      <div className="question-forms">
        <QuestionForm
          formTitle="ADD A QUESTION"
          handleSubmit={onSubmit}
          questionTitle="QUESTION"
          questionName="question"
          questionPlaceholder="question"
          questionValue={questionData.question}
          handleQuestionChange={handleChange}
          answerTitle="ANSWER"
          answerName="answer"
          answerPlaceholder="answer"
          answerValue={questionData.answer}
          handleAnswerChange={handleChange}
          button="ADD QUESTION"
        />
      </div>
      <DropdownFilter
        title="POSITIONS"
        filters={listOfPositions}
        setSelectedFilter={setSelectedPosition}
      />
      <DropdownFilter
        title="PROGRAMS"
        filters={listOfPrograms}
        setSelectedFilter={setSelectedProgram}
      />
      <DropdownFilter
        title="DEPARTAMENTS"
        filters={listOfDepartaments}
        setSelectedFilter={setSelectedDepartament}
      />
      <div className="questions">
        {listOfQuestions.length > 0 &&
          listOfQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              post={question}
              linkTo={`question/${question.id}`}
              handleDelete={() => {
                handleDelete(question.id);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default Administrator;
