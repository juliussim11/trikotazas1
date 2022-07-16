import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
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
        <label className="form__wrapper__label">
          {questionTitle}
          <textarea
            type="text"
            name={questionName}
            placeholder={questionPlaceholder}
            value={questionValue}
            onChange={handleQuestionChange}
          />
        </label>
        <div>
          <label className="form__wrapper__label">
            {answerTitle}
            <textarea
              name={answerName}
              placeholder={answerPlaceholder}
              value={answerValue}
              onChange={handleAnswerChange}
            />
          </label>
        </div>
        <div className="form__wrapper__button">
          <Button type="submit">{button}</Button>
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
