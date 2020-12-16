import React, { memo } from "react";
import "./SortBy.scss";

function SortBy({ optionValue, setOptionValue }) {
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
        <option value="price-low">Price: Descending</option>
        <option value="price-up">Price: Ascending</option>
        <option value="name-low">Name: A to Z</option>
        <option value="name-up">Name: Z to A</option>
      </select>
    </div>
  );
}
const MemorizedSortBy = memo(SortBy);
export default MemorizedSortBy;
