import React from "react";
import "./SearchBar.scss";
import PropTypes from "prop-types";

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        placeholder="Klausimas"
        onChange={onChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func,
};

export default SearchBar;
