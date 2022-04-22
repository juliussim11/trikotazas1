import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./QuestionCard.scss";

const QuestionCard = ({ post, linkTo }) => {
  const handleDelete = () => {};

  return (
    <>
      <div className="card__wrapper">
        <Link to={linkTo} className="link">
          {post.question}
        </Link>
        <div>
          <button onClick={handleDelete}>DELETE</button>
        </div>
      </div>
    </>
  );
};

QuestionCard.propTypes = {
  post: PropTypes.object,
  linkTo: PropTypes.node,
};

export default QuestionCard;
