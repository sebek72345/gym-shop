import React from "react";
import Button from "../Button/Button";
import "./Summary.scss";
export default function Summary() {
  return (
    <div className="summary-wrapper">
      <p id="summary-title">Summary:</p>
      <div className="summary-info">
        <div className="cost-products">
          <p>Products:</p>
          <p>$200</p>
        </div>
        <div className="cost-products">
          <p>Delivery:</p>
          <p>$10</p>
        </div>
        <div className="cost-products">
          <p>Discounts:</p>
          <p>5%</p>
        </div>
        <div className=" total-cost">
          <p>Total:</p>
          <p>$153</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button name="Go to payment" />
        </div>
      </div>
    </div>
  );
}
