import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Title from "../../components/Title/Title";
import "./Home.scss";
import DropdownSearch from "../../components/DropdownSearch/DropdownSearch";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Home = () => {
  // QUESTIONS :
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [filteredListOfQuestions, setFilteredListOfQuestions] = useState([]);
  // PAGINATION :
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage] = useState(5);

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

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (filteredListOfQuestions.length < indexOfFirstItem) {
      setCurrentPage(1);
    } else {
      setCurrentItems(
        filteredListOfQuestions
          .reverse()
          .slice(indexOfFirstItem, indexOfLastItem)
      );
    }
  }, [filteredListOfQuestions, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
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

export default Home;
