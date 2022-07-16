import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {totalPages > 1 && totalPages !== 3 && totalPages !== 4 && (
        <nav className="pagination-block">
          {currentPage > 1 && totalPages > 4 && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<"}
            </a>
          )}

          {currentPage !== 1 && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(1)}
            >
              1
            </a>
          )}

          {currentPage > 2 && totalPages > 4 && (
            <button className="pagination-block__page-button">{"..."}</button>
          )}

          {currentPage === totalPages && totalPages > 4 && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {currentPage - 1}
            </a>
          )}

          <a
            className="pagination-block__page-button pagination-block__page-button--current"
            href="#list"
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </a>
          {currentPage === 1 && totalPages > 4 && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </a>
          )}
          {currentPage < totalPages - 1 && totalPages > 4 && (
            <button className="pagination-block__page-button">{"..."}</button>
          )}

          {currentPage !== totalPages && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </a>
          )}
          {currentPage < totalPages && totalPages > 4 && (
            <a
              className="pagination-block__page-button"
              href="#list"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {">"}
            </a>
          )}
        </nav>
      )}
      {totalPages >= 3 && totalPages <= 4 && (
        <nav className="pagination-block">
          <a
            className={
              currentPage === 1
                ? "pagination-block__page-button pagination-block__page-button--current"
                : "pagination-block__page-button"
            }
            href="#list"
            onClick={() => handlePageChange(1)}
          >
            1
          </a>
          <a
            className={
              currentPage === 2
                ? "pagination-block__page-button pagination-block__page-button--current"
                : "pagination-block__page-button"
            }
            href="#list"
            onClick={() => handlePageChange(2)}
          >
            2
          </a>
          <a
            className={
              currentPage === 3
                ? "pagination-block__page-button pagination-block__page-button--current"
                : "pagination-block__page-button"
            }
            href="#list"
            onClick={() => handlePageChange(3)}
          >
            3
          </a>
          {totalPages === 4 && (
            <a
              className={
                currentPage === 4
                  ? "pagination-block__page-button pagination-block__page-button--current"
                  : "pagination-block__page-button"
              }
              href="#list"
              onClick={() => handlePageChange(4)}
            >
              4
            </a>
          )}
        </nav>
      )}
    </>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  handlePageChange: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Pagination;
