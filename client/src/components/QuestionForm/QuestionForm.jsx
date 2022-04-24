import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
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
  return (
    <div className="form__wrapper">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <h3>{questionTitle}</h3>
        <input
          type="text"
          name={questionName}
          placeholder={questionPlaceholder}
          value={questionValue}
          onChange={handleQuestionChange}
        />
        <div className="form__wrapper_input">
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
};

export default QuestionForm;
