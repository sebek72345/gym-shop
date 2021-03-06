import React, { useContext } from "react";
import "./Filters.scss";
import Button from "../../Button/Button";
import { ProductContext } from "../../../context";

function Filters({ brands, category }) {
  const renderBrandsRadio = () =>
    brands.map((brand) => (
      <label key={brand}>
        <input type="radio" name="brandRadio" value={brand} />
        {brand}
      </label>
    ));

  const { filterByPrice, filterByBrand } = useContext(ProductContext);
  const setFiltersPrice = (e) => {
    const {
      target: {
        dataset: { min, max },
      },
    } = e;
    const minValue = min;
    const maxValue = max;
    filterByPrice(minValue, maxValue);
  };
  const SetFiltersBrand = (e) => {
    const {
      target: { value },
    } = e;
    const valueClickedFilter = value;
    filterByBrand(valueClickedFilter);
  };

  return (
    <aside className="filters-wrapper">
      <h3 className="filters-title">FILTR BY:</h3>
      <div className="main-filters">
        <div className="filters-by-brand">
          <p className="filters-subtitle">BRAND:</p>
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
      </div>
      <Button name="Clear filters" category={category} />
    </aside>
  );
}
const MemorizedFilters = React.memo(Filters);
export default MemorizedFilters;
