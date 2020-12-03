import React from "react";
import { routes } from "../../../routes";
import { Link } from "react-router-dom";
import "./Cart.scss";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
export default function Cart() {
  return (
    <Link className="cart" to={routes.cart}>
      <div className="cart-amount">
        <p>5</p>
      </div>
      <ShoppingCartIcon style={{ fontSize: "52px" }} />
      <p className="cart-name">Cart</p>
    </Link>
  );
}
