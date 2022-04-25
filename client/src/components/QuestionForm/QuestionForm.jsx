import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
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
  positions,
  programs,
  departaments,
  ...props
}) => {
  const [questionData, setQuestionData] = useState({
    PositionId: [],
    ProgramId: [],
    DepartamentId: [],
  });
  console.log("QUESTION DATA: ", questionData);

  const onCheck = (id) => {
    setQuestionData({
      ...questionData,
      ProgramId: [...questionData.ProgramId, id],
    });
  };

  const onUncheck = (id) => {
    setQuestionData({
      ...questionData,
      ProgramId: questionData.ProgramId.filter((progId) => progId !== id),
    });
  };

  // const addPosition = (id) => {
  //   if (!positionChecked) {
  //     setQuestionData({ ...questionData, PositionId: id });
  //     props.setQuestionData({ ...questionData, PositionId: id });
  //     setPositionChecked(true);
  //     props.setPositionChecked(true);
  //   }
  // };

  // const addDepartament = (id) => {
  //   if (!departamentChecked.id) {
  //     setQuestionData({ ...questionData, DepartamentId: id });
  //     props.setQuestionData({ ...questionData, DepartamentId: id });
  //     setDepartamentChecked(true);
  //     props.setDepartamentChecked(true);
  //   }
  // };

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
        <div>
          <h3>{answerTitle}</h3>
          <textarea
            name={answerName}
            placeholder={answerPlaceholder}
            value={answerValue}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="form__wrapper__checkbox">
          <div className="form__wrapper__checkbox__column">
            <h4>PROGRAMOS</h4>
            {programs.length > 0 &&
              programs.map((program) => (
                <FilterCheckBox
                  checkFilterTitle="PROGRAMOS"
                  title={program.title}
                  name={program.title}
                  id={program.id}
                  key={program.id}
                  onCheck={onCheck}
                  onUncheck={onUncheck}
                />
              ))}
          </div>
          <div className="form__wrapper__checkbox__column">
            <h4>PAREIGOS</h4>
            {positions.length > 0 &&
              positions.map((position) => (
                <FilterCheckBox
                  checkFilterTitle="PAREIGOS"
                  title={position.title}
                  name={position.title}
                  key={position.id}
                  id={position.id}
                />
              ))}
          </div>
          <div className="form__wrapper__checkbox__column">
            <h4>DEPARTAMENTAS</h4>
            {departaments.length > 0 &&
              departaments.map((departament) => (
                <FilterCheckBox
                  checkFilterTitle="DEPARTAMENTAI"
                  title={departament.title}
                  name={departament.title}
                  key={departament.id}
                  id={departament.id}
                />
              ))}
          </div>
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
};

export default QuestionForm;
