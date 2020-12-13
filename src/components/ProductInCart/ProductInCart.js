import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { ProductContext } from "../../context";
import InputQuantity from "../InputQuantity/InputQuantity";
import "./ProductInCart.scss";

export default function ProductInCart({ product }) {
  const { name, price, pics, slug, available, amountInCart } = product;
  const { removeItemFromCart } = useContext(ProductContext);
  const totalPriceForOneItem = price * amountInCart;
  const totalPriceRound = totalPriceForOneItem.toFixed(2);
  const [quantity, setQuantity] = useState(amountInCart);
  return (
    <div className="summary-basket">
      <div className="summary-image">
        <Link to={`products/${slug}`}>
          <img src={pics[0]} alt="product" />
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
            maxAvailableProduct={available}
            name={slug}
          />
        </p>
      </div>
      <div className="product-action">
        <div className="product-action-price">
          <p>${totalPriceRound}</p>
          {amountInCart >= 2 && (
            <p className="product-action-one">per item ${price}</p>
          )}
        </div>
        <DeleteForeverIcon
          style={{ fontSize: "32px", cursor: "pointer" }}
          onClick={() => removeItemFromCart(slug)}
        />
      </div>
    </div>
  );
}
