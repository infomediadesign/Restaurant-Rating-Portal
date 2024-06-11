import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for restaurants..."
        className="search-input"
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
