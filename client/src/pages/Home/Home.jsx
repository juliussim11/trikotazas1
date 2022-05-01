import TopBar from "../../components/TopBar/TopBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import Title from "../../components/Title/Title";
import "./Home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  // QUESTIONS :
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [filteredListOfQuestions, setFilteredListOfQuestions] = useState([]);

  // POSITIONS:
  const [listOfPositions, setListOfPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positionQuestions, setPositionQuestions] = useState([]);
  // PROGRAMS:
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programQuestions, setProgramQuestions] = useState([]);
  // DEPARTAMENTS:
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [selectedDepartament, setSelectedDepartament] = useState(null);
  const [departamentQuestions, setDepartamentQuestions] = useState([]);

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
  };

  return (
    <>
      <TopBar />
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
              />
            ))}
      </div>
    </>
  );
};

export default Home;
