import React from "react";
import InputQuantity from "../InputQuantity/InputQuantity";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./ProductInCart.scss";
export default function ProductInCart() {
  return (
    <div className="summary-basket">
      <div className="summary-image">
        <img
          src="https://smhttp-ssl-18062.nexcesscdn.net/media/prod.image/p/o/polar_loop.jpg"
          alt="image product"
        />
      </div>
      <div className="product-details">
        <p className="product-title">Beliar Emperor</p>
        <p>
          Quantity: <InputQuantity />
        </p>
      </div>
      <div className="product-action">
        <div className="product-action-price">
          <p>$115.26</p>
        </div>

        <DeleteForeverIcon />
      </div>
    </div>
  );
}
