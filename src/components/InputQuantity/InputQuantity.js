import React, { useContext } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./InputQuantity.scss";
import "react-notifications/lib/notifications.css";
import { ProductContext } from "../../context";
export default function InputQuantity({
  quantity,
  setQuantity,
  disabled,
  addWithoutButton,
  maxAvailableProduct,

  name,
}) {
  const { increaseProductInCart, decreaseProductInCart } = useContext(
    ProductContext
  );
  const increase = () => {
    if (quantity < maxAvailableProduct) {
      return setQuantity(++quantity);
    }
    NotificationManager.info(
      `You can't add more products. We have only ${maxAvailableProduct} items`
    );
  };
  const decrease = () => {
    if (quantity > 1) {
      console.log("ss");
      return setQuantity(--quantity);
    }
    console.log("ssa");
    console.log(quantity);
  };
  const changeQuantity = (e) => {
    const receivedValue = e.target.value;
    setQuantity(receivedValue);
  };
  return (
    <div className="quantity-product">
      <button
        disabled={disabled}
        type="button"
        onClick={() => {
          if (addWithoutButton) {
            decreaseProductInCart(name);
          }
          decrease();
        }}
        className="button button-up"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max={maxAvailableProduct}
        value={quantity}
        onChange={(e) => {
          changeQuantity(e);
        }}
      />
      <button
        disabled={disabled}
        type="button"
        onClick={() => {
          if (addWithoutButton) {
            increaseProductInCart(name);
          }
          increase();
        }}
        className="button button-down"
      >
        +
      </button>
      <NotificationContainer />
    </div>
  );
}
