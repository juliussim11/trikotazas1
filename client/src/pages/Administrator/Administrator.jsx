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
  const [filteredListOfQuestions, setFilteredListOfQuestions] = useState([]);

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

  // POSITIONS:
  const [listOfPositions, setListOfPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedPositionLoading, setSelectedPositionLoading] = useState(false);
  console.log("SELETED POSITION: ", selectedPosition);
  // PROGRAMS:
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedProgramLoading, setSelectedProgramLoading] = useState(false);
  console.log("SELETED PROGRAM: ", selectedProgram);
  // DEPARTAMENTS:
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [selectedDepartamentLoading, setSelectedDepartamentLoading] =
    useState(false);
  console.log("SELETED DEPARTAMENT: ", selectedDepartament);

  // GET DATA FROM DB :
  useEffect(() => {
    axios.get("http://localhost:5000/questions").then((response) => {
      setListOfQuestions(response.data);
      setFilteredListOfQuestions(response.data);
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
  console.log("LIST OF QUESTIONS: ", listOfQuestions);

  const onFilterSubmit = (e) => {
    e.preventDefault();
    setSelectedProgramLoading(true);
    setSelectedPositionLoading(true);
    setSelectedDepartamentLoading(true);
    if (selectedProgram && !selectedPosition && !selectedDepartament) {
      axios
        .get(`http://localhost:5000/programs/questions/${selectedProgram}`)
        .then((response) => {
          setFilteredListOfQuestions(
            listOfQuestions.filter((e) =>
              response.data.some((item) => item.id !== e.id)
            )
          );
        });
    }
    if (selectedProgram && selectedPosition && selectedDepartament) {
      axios
        .get(`http://localhost:5000/programs/questions/${selectedProgram}`)
        .then((response) => {
          setFilteredListOfQuestions(
            listOfQuestions.filter((e) =>
              response.data.some((item) => item.id !== e.id)
            )
          );
          return axios.get(
            `http://localhost:5000/positions/questions/${selectedPosition}`
          );
        })
        .then((response) => {
          setFilteredListOfQuestions(
            filteredListOfQuestions.filter((e) =>
              response.data.some((item) => item.id !== e.id)
            )
          );
          return axios.get(
            `http://localhost:5000/departaments/questions/${selectedDepartament}`
          );
        })
        .then((response) => {
          setFilteredListOfQuestions(
            filteredListOfQuestions.filter((e) =>
              response.data.some((item) => item.id !== e.id)
            )
          );
        });
      // axios
      //   .get(`http://localhost:5000/positions/questions/${selectedPosition}`)
      //   .then((response) => {
      //     setFilteredListOfQuestions(
      //       filteredListOfQuestions.filter((e) =>
      //         response.data.some((item) => item.id !== e.id)
      //       )
      //     );
      //   })
      //   .then(() => setSelectedPositionLoading(false));

      // axios
      //   .get(
      //     `http://localhost:5000/departaments/questions/${selectedDepartament}`
      //   )
      //   .then((response) => {
      //     setFilteredListOfQuestions(
      //       filteredListOfQuestions.filter((e) =>
      //         response.data.some((item) => item.id !== e.id)
      //       )
      //     );
      //   });
    }
    if (!selectedProgram && !selectedPosition && !selectedDepartament) {
      axios.get("http://localhost:5000/questions").then((response) => {
        setFilteredListOfQuestions(response.data);
      });
    }
    console.log(
      "ASASDASDSAD: ",
      selectedProgram && selectedPosition && selectedDepartament
    );
  };

  const onProgramChange = (value) => {
    setSelectedProgram(value);
    console.log("SELETED PROGRAM: ", selectedProgram);
    if (!selectedProgram) {
      axios.get("http://localhost:5000/questions").then((response) => {
        setListOfQuestions(response.data);
      });
    } else {
      axios
        .get(`http://localhost:5000/programs/questions/${selectedProgram}`)
        .then((response) => {
          setListOfQuestions(
            listOfQuestions.filter((e) =>
              response.data.some((item) => item.id !== e.id)
            )
          );
        });
    }
  };

  const onPositionChange = (identificator) => {
    if (!identificator) {
      axios.get("http://localhost:5000/questions").then((response) => {
        setListOfQuestions(response.data);
      });
    } else {
      axios
        .get(`http://localhost:5000/positions/questions/${identificator}`)
        .then((response) => {
          setListOfQuestions(
            listOfQuestions.filter((e) =>
              response.data.some((item) => item.id === e.id)
            )
          );
        });
    }
  };

  const onDepartamentChange = (identificator) => {
    if (!identificator) {
      axios.get("http://localhost:5000/questions").then((response) => {
        setListOfQuestions(response.data);
      });
    } else {
      axios
        .get(`http://localhost:5000/departaments/questions/${identificator}`)
        .then((response) => {
          setListOfQuestions(
            listOfQuestions.filter((e) =>
              response.data.some((item) => item.id === e.id)
            )
          );
        });
    }
  };

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
      <form onSubmit={onFilterSubmit}>
        <DropdownFilter
          title="PROGRAMS"
          filters={listOfPrograms}
          setSelectedFilter={setSelectedProgram}
        />
        <DropdownFilter
          title="POSITIONS"
          filters={listOfPositions}
          setSelectedFilter={setSelectedPosition}
        />
        <DropdownFilter
          title="DEPARTAMENTS"
          filters={listOfDepartaments}
          setSelectedFilter={setSelectedDepartament}
        />
        <button>SEARCH</button>
      </form>
      <div className="questions">
        {filteredListOfQuestions.length > 0 &&
          filteredListOfQuestions.map((question) => (
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
