import React from "react";
import "./InputQuantity.scss";
export default function InputQuantity({ quantity, setQuantity }) {
  return (
    <div className="quantity-product">
      <button
        onClick={() => setQuantity(--quantity)}
        className="button button-up"
      >
        -
      </button>
      <input type="number" min="0" value={quantity} />
      <button
        onClick={() => setQuantity(++quantity)}
        className="button button-down"
      >
        +
      </button>
    </div>
  );
}
