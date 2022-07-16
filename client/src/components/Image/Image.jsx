import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../helpers/AuthContext";
import DeleteIcon from "../../assets/delete_icon.svg";
import "./Image.scss";

const Image = ({ name, onDelete }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="image">
      <img src={`http://localhost:5000/${name}`} alt="paveiksliukas" />
      {isLoggedIn ? <button className="img-delete" onClick={onDelete} /> : null}
    </div>
  );
};

Image.propTypes = {
  name: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Image;
