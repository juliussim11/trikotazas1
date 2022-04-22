import React, { useState, useEffect } from "react";
import "./Administrator.scss";
import { Editor } from "@tinymce/tinymce-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopBar from "../../components/TopBar/TopBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import axios from "axios";

const Administrator = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    answer: "",
  });
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [position, setPosition] = useState({
    title: "",
  });

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition({
      ...position,
      [name]: value,
    });
  };

  const handlePositionSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/positions", position).then((response) => {
      console.log("IT WORKED (POSITION)");
    });
  };
  console.log(position);

  useEffect(() => {
    axios.get("http://localhost:5000/questions").then((response) => {
      setListOfQuestions(response.data);
    });
    axios.get("http://localhost:5000/positions").then((response) => {
      console.log(response.data);
    });
  }, []);

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
        } else {
          console.log("IT WORKED");
        }
      });
    resetUserInputs();
  };
  console.log(listOfQuestions);

  const resetUserInputs = () => {
    setQuestionData({
      question: "",
      answer: "",
    });
  };

  // const onEditorSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const handleEditorChange = (e) => {
  //   setEditor(e.target.value);
  // };

  return (
    <>
      <TopBar />
      {/* <form onClick={onEditorSubmit}>
        <Editor value={editor} name="editor" onChange={handleEditorChange} />
        <div>
          <button>SUBMIT</button>
        </div>
      </form>
      <Editor />
      <Editor /> */}
      <div>
        POSITION
        <form onSubmit={handlePositionSubmit}>
          <input
            type="text"
            name="title"
            placeholder="position"
            value={position.title}
            onChange={handlePositionChange}
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="question"
          placeholder="klausimas"
          value={questionData.question}
          onChange={handleChange}
        />
        <div>
          <textarea
            name="answer"
            placeholder="atsakymas"
            value={questionData.answer}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div>
        {listOfQuestions.length > 0 &&
          listOfQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              post={question}
              linkTo={`question/${question.id}`}
            />
          ))}
      </div>
    </>
  );
};

export default Administrator;
