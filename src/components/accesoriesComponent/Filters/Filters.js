import React from "react";
import "./Filters.scss";
import Button from "./../../Button/Button";
export default function Filters() {
  return (
    <aside className="filters-wrapper">
      <h3 className="filters-title">FILTR BY:</h3>
      <p className="filters-subtitle">BRAND:</p>
      <div className="filters-by-brand">
        <label>
          <input type="radio" />
          Marka1
        </label>
        <label>
          <input type="radio" />
          Marka2
        </label>
        <label>
          <input type="radio" />
          Marka3
        </label>
      </div>
      <div className="filters-by-price">
        <p className="filters-subtitle">PRICE:</p>
        <label>
          <input type="radio" />
          $0-99
        </label>
        <label>
          <input type="radio" />
          $99-199
        </label>
        <label>
          <input type="radio" />
          $199-299
        </label>
      </div>
      <Button name="Clear filters" />
    </aside>
  );
}
