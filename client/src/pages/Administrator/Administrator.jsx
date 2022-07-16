import React, { useState, useEffect } from "react";
import "./Administrator.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownSearch from "../../components/DropdownSearch/DropdownSearch";

const Administrator = () => {
  // QUESTIONS :
  const [questionData, setQuestionData] = useState({
    question: "",
    answer: "",
  });
  console.log("QUESTION DATA: ", questionData);
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [filteredListOfQuestions, setFilteredListOfQuestions] = useState([]);

  // PAGINATION :
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage] = useState(5);

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
    if (window.confirm("Ar tikrai norite ištrinti klausimą?")) {
      axios
        .delete(`http://localhost:5000/questions/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          alert("Klausimas ištrintas");
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
    } else {
      return;
    }
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

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (filteredListOfQuestions.length < indexOfFirstItem) {
      setCurrentPage(1);
    } else {
      setCurrentItems(
        filteredListOfQuestions.slice(indexOfFirstItem, indexOfLastItem)
      );
    }
  }, [filteredListOfQuestions, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="links">
        <div className="links__wrapper">
          <Link to="/administrator/positions">
            <h2>PAREIGOS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/administrator/programs`}>
            <h2>PROGRAMOS</h2>
          </Link>
        </div>
        <div className="links__wrapper">
          <Link to={`/administrator/departaments`}>
            <h2>SKYRIAI</h2>
          </Link>
        </div>
      </div>
      <div className="question-forms">
        <QuestionForm
          formTitle="PRIDĖTI KLAUSIMĄ"
          handleSubmit={onSubmit}
          questionTitle="KLAUSIMAS"
          questionName="question"
          questionPlaceholder="klausimas"
          questionValue={questionData.question}
          handleQuestionChange={handleChange}
          answerTitle="ATSAKYMAS"
          answerName="answer"
          answerPlaceholder="atsakymas"
          answerValue={questionData.answer}
          handleAnswerChange={handleChange}
          button="PRIDĖTI"
        />
      </div>
      <SearchBar onChange={(e) => setQuery(e.target.value)} />
      <div className="questions">
        <DropdownSearch
          onFilterSubmit={onFilterSubmit}
          listOfPrograms={listOfPrograms}
          setSelectedProgram={setSelectedProgram}
          listOfPositions={listOfPositions}
          setSelectedPosition={setSelectedPosition}
          listOfDepartaments={listOfDepartaments}
          setSelectedDepartament={setSelectedDepartament}
        />
      </div>
      <div className="questions">
        {currentItems.length > 0 &&
          currentItems
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
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredListOfQuestions.length}
          currentPage={currentPage}
          handlePageChange={paginate}
        />
      </div>
    </>
  );
};

export default Administrator;
