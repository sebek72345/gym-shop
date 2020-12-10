import React, { useContext, useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { routes } from "../../../routes";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../context";
import "./Cart.scss";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
export default function Cart() {
  const { productsInCart } = useContext(ProductContext);
  let [amount, setAmount] = useState(0);

  useEffect(() => {
    if (productsInCart.length) {
      setAmount(
        productsInCart.reduce((acc, product) => {
          if (product.inCart) {
            return ++acc;
          } else {
            return acc;
          }
        }, 0)
      );
      /* else {
      const productFromLocalStorage = window.localStorage.getItem("inCart");
      console.log(productFromLocalStorage);
      const temp = productFromLocalStorage.reduce((acc, product) => {
        return (acc += product.inCart);
      }, 0);
      console.log(temp);
    } */
    }
  }, [productsInCart]);
  return (
    <Link className="cart" to={routes.cart}>
      <div className="cart-amount">
        <p>{amount}</p>
      </div>
      <ShoppingCartIcon style={{ fontSize: "52px" }} />
      <p className="cart-name">Cart</p>
    </Link>
  );
}
