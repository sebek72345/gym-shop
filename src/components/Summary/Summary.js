import React, { useContext } from "react";
import Button from "../Button/Button";
import "./Summary.scss";
import { ProductContext } from "../../context";

export default function Summary() {
  const { productsInCart } = useContext(ProductContext);
  let totalProduct;
  if (productsInCart.length) {
    totalProduct = productsInCart.reduce((acc, product) => {
      const totalOneProd = product.amountInCart * product.price;
      const totalIteration = acc + totalOneProd;
      return totalIteration;
    }, 0);
  } else {
    const productInCartFromSesion = window.localStorage.getItem("inCart");
    console.log(productInCartFromSesion);
    totalProduct = productsInCart
      .reduce((acc, product) => {
        const totalOneProd = product.amountInCart * product.price;
        const totalIteration = acc + totalOneProd;
        return totalIteration;
      }, 0)
      .toFixed(2);
  }
  const deliveryCost = 10;
  const discount = 0.05;
  const costWithShip = totalProduct + discount;
  const total = (costWithShip - costWithShip * discount).toFixed(2);
  return (
    <div className="summary-wrapper">
      <p id="summary-title">Summary:</p>
      <div className="summary-info">
        <div className="cost-products">
          <p>Products:</p>
          <p>$ {totalProduct}</p>
        </div>
        <div className="cost-products">
          <p>Delivery:</p>
          <p>${deliveryCost}</p>
        </div>
        <div className="cost-products">
          <p>Discounts:</p>
          <p>{discount * 100}%</p>
        </div>
        <div className=" total-cost">
          <p>Total:</p>
          <p>${total}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button name="Go to payment" />
        </div>
      </div>
    </div>
  );
}
