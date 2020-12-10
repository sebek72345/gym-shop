import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./InputQuantity.scss";
import "react-notifications/lib/notifications.css";
export default function InputQuantity({
  quantity,
  setQuantity,
  disabled,
  addWithoutButton,
  maxAvailableProduct,
  increaseProductInCart,
  name,
}) {
  const increase = () => {
    if (quantity < maxAvailableProduct) {
      setQuantity(++quantity);
      increaseProductInCart(name, quantity);
      return;
    }
    NotificationManager.info(
      `You can't add more products. We have only ${maxAvailableProduct} items`
    );
    return quantity;
  };
  return (
    <div className="quantity-product">
      <button
        disabled={disabled}
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
      <input
        type="number"
        min="1"
        max={maxAvailableProduct}
        value={quantity}
        onChange
      />
      <button
        disabled={disabled}
        type="button"
        onClick={() => {
          console.log({ quantity, maxAvailableProduct });
          if (quantity < maxAvailableProduct) {
            return setQuantity(++quantity);
          }
          NotificationManager.info(
            `You can't add more products. We have only ${maxAvailableProduct} items`
          );
          return quantity;
        }}
        className="button button-down"
      >
        +
      </button>
      <NotificationContainer />
    </div>
  );
}
