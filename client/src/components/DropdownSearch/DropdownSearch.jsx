import React from "react";
import "./DropdownSearch.scss";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const DropdownSearch = ({
  onFilterSubmit,
  listOfPrograms,
  setSelectedProgram,
  listOfPositions,
  setSelectedPosition,
  listOfDepartaments,
  setSelectedDepartament,
  ...props
}) => {
  return (
    <div className="filter-wrapper">
      <form onSubmit={onFilterSubmit}>
        <DropdownFilter
          title="PROGRAMA"
          filters={listOfPrograms}
          setSelectedFilter={setSelectedProgram}
        />
        <DropdownFilter
          title="PAREIGA"
          filters={listOfPositions}
          setSelectedFilter={setSelectedPosition}
        />
        <DropdownFilter
          title="SKYRIUS"
          filters={listOfDepartaments}
          setSelectedFilter={setSelectedDepartament}
        />
        <div className="filter-wrapper__button">
          <Button>IEŠKOTI</Button>
        </div>
      </form>
    </div>
  );
};

DropdownSearch.propTypes = {
  onFilterSubmit: PropTypes.func,
  listOfPrograms: PropTypes.array,
  setSelectedProgram: PropTypes.func,
  listOfPositions: PropTypes.array,
  setSelectedPosition: PropTypes.func,
  listOfDepartaments: PropTypes.array,
  setSelectedDepartament: PropTypes.func,
};

export default DropdownSearch;
