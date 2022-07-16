import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./FilterForm.scss";

const FilterForm = ({
  title,
  handleSubmit,
  button,
  inputName,
  inputPlaceholder,
  inputValue,
  onChange,
}) => {
  return (
    <div className="form__wrapper">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name={inputName}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={onChange}
        />
        <div className="form__wrapper__button">
          <Button type="submit">{button}</Button>
        </div>
      </form>
    </div>
  );
};

FilterForm.propTypes = {
  title: PropTypes.string,
  button: PropTypes.node,
  handleSubmit: PropTypes.func,
  inputName: PropTypes.node,
  inputPlaceholder: PropTypes.node,
  inputValue: PropTypes.node,
  onChange: PropTypes.func,
};

export default FilterForm;
