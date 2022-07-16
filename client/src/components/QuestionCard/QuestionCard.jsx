import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./QuestionCard.scss";
import { AuthContext } from "../../helpers/AuthContext";
import DeleteIcon from "../../assets/delete_icon.svg";

const QuestionCard = ({ post, linkTo, handleDelete }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="card__wrapper">
      <Link to={linkTo} className="link">
        <h3>{post.question}</h3>
      </Link>
      {isLoggedIn ? (
        <div>
          <button onClick={handleDelete}>
            <img src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

QuestionCard.propTypes = {
  post: PropTypes.object,
  linkTo: PropTypes.node,
  handleDelete: PropTypes.func,
};

export default QuestionCard;
