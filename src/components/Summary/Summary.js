import React, { useContext, useEffect } from "react";

import Button from "../Button/Button";
import "./Summary.scss";
import { ProductContext } from "../../context";
import firebaseApp from "../../firebase/initialization";

export default function Summary() {
  const {
    productsInCart,
    userHaveDiscount,
    setUserHaveDiscount,
    currentUser,
  } = useContext(ProductContext);
  useEffect(() => {
    if (currentUser) {
      const userEmail = firebaseApp.auth().currentUser.email;
      firebaseApp
        .firestore()
        .collection("newsLetterUserList")
        .doc("9aAd2SVvGH26GUpMshiy")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const allEmails = doc.data().emails;
            setUserHaveDiscount(allEmails.includes(userEmail));
          }
        });
    }
  }, []);
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
    totalProduct = productsInCart.reduce((acc, product) => {
      const totalOneProd = product.amountInCart * product.price;
      const totalIteration = acc + totalOneProd;
      return totalIteration;
    }, 0);
  }
  totalProduct = Number(totalProduct.toFixed(2));
  const deliveryCost = 10;
  const discount = userHaveDiscount ? 0.05 : 0;
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
