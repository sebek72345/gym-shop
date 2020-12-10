import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context";
import InputQuantity from "../InputQuantity/InputQuantity";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "./ProductInCart.scss";
export default function ProductInCart({
  name,
  price,
  image,
  link,
  maxAvailableProduct,
}) {
  const { getAmounProductInCart, removeItemFromCart } = useContext(
    ProductContext
  );
  const amountIn = getAmounProductInCart("Chrome-Curl-Bar");
  let [quantity, setQuantity] = useState(amountIn);

  return (
    <div className="summary-basket">
      <div className="summary-image">
        <Link to={`products/${link}`}>
          <img src={image} alt="image product" />
        </Link>
      </div>
      <div className="product-details">
        <p className="product-title">{name}</p>
        <p>
          Quantity:
          <InputQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            addWithoutButton
            maxAvailableProduct={maxAvailableProduct}
            name={name}
          />
        </p>
      </div>
      <div className="product-action">
        <div className="product-action-price">
          <p>{price}</p>
        </div>
        <DeleteForeverIcon onClick={() => removeItemFromCart(name)} />
      </div>
    </div>
  );
}
