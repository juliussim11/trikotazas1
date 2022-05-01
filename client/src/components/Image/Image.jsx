import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../helpers/AuthContext";
import "./Image.scss";

const Image = ({ name, onDelete }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="image">
      <img src={`http://localhost:5000/${name}`} />
      {isLoggedIn ? <button onClick={onDelete}>DELETE</button> : null}
    </div>
  );
};

Image.propTypes = {
  name: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Image;
