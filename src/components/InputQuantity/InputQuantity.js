import React from "react";
import "./InputQuantity.scss";
export default function InputQuantity({ quantity, setQuantity }) {
  return (
    <div className="quantity-product">
      <button
        type="button"
        onClick={() =>
          setQuantity(() => {
            if (quantity > 1) {
              --quantity;
            }
            return quantity;
          })
        }
        className="button button-up"
      >
        -
      </button>
      <input type="number" min="1" value={quantity} />
      <button
        type="button"
        onClick={() => setQuantity(++quantity)}
        className="button button-down"
      >
        +
      </button>
    </div>
  );
}
