import React, { useContext } from "react";
import "./Filters.scss";
import Button from "./../../Button/Button";
import { ProductContext } from "../../../context";
export default function Filters({ brands, category }) {
  const renderBrandsRadio = () => {
    return brands.map((brand) => (
      <label>
        <input type="radio" name="brandRadio" value={brand} />
        {brand}
      </label>
    ));
  };
  const { filterByPrice, useFiltersBrand } = useContext(ProductContext);
  const setFiltersPrice = (e) => {
    const min = e.target.dataset.min;
    const max = e.target.dataset.max;
    filterByPrice(min, max, category);
  };
  const SetFiltersBrand = (e) => {
    const value = e.target.value;
    useFiltersBrand(value, category);
  };

  return (
    <aside className="filters-wrapper">
      <h3 className="filters-title">FILTR BY:</h3>
      <p className="filters-subtitle">BRAND:</p>
      <div className="filters-by-brand">
        <form onChange={SetFiltersBrand}>{renderBrandsRadio()}</form>
      </div>
      <div className="filters-by-price">
        <p className="filters-subtitle">PRICE:</p>
        <form onChange={setFiltersPrice}>
          <label>
            <input
              type="radio"
              name="filter-value"
              data-min="0"
              data-max="50"
            />
            $0-50
          </label>
          <label>
            <input
              type="radio"
              name="filter-value"
              data-min="50"
              data-max="80"
            />
            $50-80
          </label>
          <label>
            <input
              type="radio"
              name="filter-value"
              data-min="80"
              data-max="130"
            />
            $80-130
          </label>
        </form>
      </div>
      <Button name="Clear filters" category={category} />
    </aside>
  );
}
