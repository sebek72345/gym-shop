import React from "react";
import "./SortBy.scss";

export default function SortBy({ optionValue, setOptionValue }) {
  const setFilters = (e) => {
    setOptionValue(e.target.value);
  };

  return (
    <div className="sort-by">
      <span>Sort by:</span>
      <select
        name="sortBy"
        className="sort-by-select"
        value={optionValue}
        onChange={setFilters}
      >
        <option value="price-low">Price:descending</option>
        <option value="price-up">Price:ascending</option>
        <option value="name-low">Name: A to Z</option>
        <option value="name-up">Name: Z to A</option>
      </select>
    </div>
  );
}
