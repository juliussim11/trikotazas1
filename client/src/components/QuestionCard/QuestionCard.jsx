import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./QuestionCard.scss";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";

const QuestionCard = ({ post, linkTo }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/questions/${post.id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Question Deleted");
      });
  };
  const { isLoggedIn } = useContext(AuthContext);
  console.log("POST ID: ", post.id);

  return (
    <>
      <div className="card__wrapper">
        <Link to={linkTo} className="link">
          {post.question}
        </Link>
        {isLoggedIn ? (
          <div>
            <button onClick={handleDelete}>DELETE{post.id}</button>
          </div>
        ) : null}
      </div>
    </>
  );
};

QuestionCard.propTypes = {
  post: PropTypes.object,
  linkTo: PropTypes.node,
};

export default QuestionCard;
