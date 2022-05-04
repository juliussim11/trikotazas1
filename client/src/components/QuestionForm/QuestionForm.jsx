import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import axios from "axios";
import "./QuestionForm.scss";

const QuestionForm = ({
  formTitle,
  questionTitle,
  answerTitle,
  handleSubmit,
  button,
  questionName,
  questionPlaceholder,
  questionValue,
  handleQuestionChange,
  handleAnswerChange,
  answerName,
  answerPlaceholder,
  answerValue,
}) => {
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }
  return (
    <div className="form__wrapper">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <h3>{questionTitle}</h3>
        <textarea
          type="text"
          name={questionName}
          placeholder={questionPlaceholder}
          value={questionValue}
          onChange={handleQuestionChange}
        />
        <div>
          <h3>{answerTitle}</h3>
          <textarea
            name={answerName}
            placeholder={answerPlaceholder}
            value={answerValue}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="form__wrapper__button">
          <button>{button}</button>
        </div>
      </form>
    </div>
  );
};

QuestionForm.propTypes = {
  formTitle: PropTypes.string,
  questionTitle: PropTypes.string,
  answerTitle: PropTypes.string,
  button: PropTypes.node,
  handleSubmit: PropTypes.func,
  questionName: PropTypes.node,
  questionPlaceholder: PropTypes.node,
  questionValue: PropTypes.node,
  handleQuestionChange: PropTypes.func,
  handleAnswerChange: PropTypes.func,
  answerName: PropTypes.node,
  answerPlaceholder: PropTypes.node,
  answerValue: PropTypes.node,
  positions: PropTypes.array,
  programs: PropTypes.array,
  departaments: PropTypes.array,
  setQuestionData: PropTypes.func,
};

export default QuestionForm;
