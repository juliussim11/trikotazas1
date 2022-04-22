import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";
import axios from "axios";

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState({});

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/byId/${id}`).then((response) => {
      setQuestionData(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };
  console.log(id);
  console.log("POST DATA: ", questionData);

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
        <button>UPDATE</button>
      </form>
    </>
  );
};

export default QuestionPage;