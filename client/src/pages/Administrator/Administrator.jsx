import React, { useState, useEffect } from "react";
import "./Administrator.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopBar from "../../components/TopBar/TopBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

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
        setFilteredListOfQuestions([...listOfQuestions, response.data]);
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
        setFilteredListOfQuestions(
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
    });
  };

  // POSITIONS:
  const [listOfPositions, setListOfPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positionQuestions, setPositionQuestions] = useState([]);
  console.log("SELETED POSITION: ", selectedPosition);
  // PROGRAMS:
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programQuestions, setProgramQuestions] = useState([]);
  console.log("SELETED PROGRAM: ", selectedProgram);
  // DEPARTAMENTS:
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [departamentQuestions, setDepartamentQuestions] = useState([]);
  console.log("SELETED DEPARTAMENT: ", selectedDepartament);

  const [query, setQuery] = useState("");

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

  useEffect(() => {
    if (selectedProgram) {
      axios
        .get(`http://localhost:5000/programs/questions/${selectedProgram}`)
        .then((response) => {
          setProgramQuestions(response.data);
        });
    }
  }, [selectedProgram]);
  console.log("PROGRAM QUESTIONS: ", positionQuestions);

  useEffect(() => {
    if (selectedPosition) {
      axios
        .get(`http://localhost:5000/positions/questions/${selectedPosition}`)
        .then((response) => {
          setPositionQuestions(response.data);
        });
    }
  }, [selectedPosition]);
  console.log("POSITION QUESTIONS: ", positionQuestions);

  useEffect(() => {
    if (selectedDepartament) {
      axios
        .get(
          `http://localhost:5000/departaments/questions/${selectedDepartament}`
        )
        .then((response) => {
          setDepartamentQuestions(response.data);
        });
    }
  }, [selectedDepartament]);
  console.log("DEPARTAMENT QUESTIONS: ", departamentQuestions);

  const onFilterSubmit = (e) => {
    e.preventDefault();
    if (selectedProgram && !selectedPosition && !selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter((e) =>
          programQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (!selectedProgram && selectedPosition && !selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter((e) =>
          positionQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (!selectedProgram && !selectedPosition && selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter((e) =>
          departamentQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (selectedProgram && selectedPosition && !selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter(
          (e) =>
            programQuestions.some((item) => item.id === e.id) &&
            positionQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (selectedProgram && !selectedPosition && selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter(
          (e) =>
            programQuestions.some((item) => item.id === e.id) &&
            departamentQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (!selectedProgram && selectedPosition && selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter(
          (e) =>
            positionQuestions.some((item) => item.id === e.id) &&
            departamentQuestions.some((item) => item.id === e.id)
        )
      );
    }
    if (!selectedProgram && !selectedPosition && !selectedDepartament) {
      setFilteredListOfQuestions(listOfQuestions);
    }
    if (selectedProgram && selectedPosition && selectedDepartament) {
      setFilteredListOfQuestions(
        listOfQuestions.filter(
          (e) =>
            programQuestions.some((item) => item.id === e.id) &&
            departamentQuestions.some((item) => item.id === e.id) &&
            positionQuestions.some((item) => item.id === e.id)
        )
      );
    }
    console.log("ASASDASDSAD: ", filteredListOfQuestions);
  };

  return (
    <>
      <TopBar />
      <div className="links">
        <div className="links__wrapper">
          <Link to="/administrator/positions">
            <h2>POSITIONS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/administrator/programs`}>
            <h2>PROGRAMS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/administrator/departaments`}>
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
      <SearchBar onChange={(e) => setQuery(e.target.value)} />
      <div className="questions">
        <div className="filter-wrapper">
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
        </div>
      </div>
      <div className="questions">
        {filteredListOfQuestions.length > 0 &&
          filteredListOfQuestions
            .filter((question) => {
              if (query === "") {
                return question;
              } else if (
                question.question
                  .toLowerCase()
                  .replace(/[ą]/g, "a")
                  .replace(/[č]/g, "c")
                  .replace(/[ę]/g, "e")
                  .replace(/[ė]/g, "e")
                  .replace(/[į]/g, "i")
                  .replace(/[š]/g, "s")
                  .replace(/[ų]/g, "u")
                  .replace(/[ū]/g, "u")
                  .replace(/[ž]/g, "z")
                  .includes(
                    query
                      .toLowerCase()
                      .replace(/[ą]/g, "a")
                      .replace(/[č]/g, "c")
                      .replace(/[ę]/g, "e")
                      .replace(/[ė]/g, "e")
                      .replace(/[į]/g, "i")
                      .replace(/[š]/g, "s")
                      .replace(/[ų]/g, "u")
                      .replace(/[ū]/g, "u")
                      .replace(/[ž]/g, "z")
                  )
              ) {
                return question;
              }
            })
            .map((question) => (
              <QuestionCard
                key={question.id}
                post={question}
                linkTo={`/question/${question.id}`}
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
