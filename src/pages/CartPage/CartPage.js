import React, { useContext } from "react";
import "./CartPage.scss";
import { ProductContext } from "../../context";
import Summary from "../../components/Summary/Summary";
import ProductInCart from "../../components/ProductInCart/ProductInCart";
export default function CartPage() {
  const { productsInCart } = useContext(ProductContext);
  return (
    <div className="cart-page-wrapper">
      <h3 className="cart-page-title">Shopping cart contents:</h3>
      <div className="products">
        <div className="products-in-cart">
          <ProductInCart />
        </div>

        <Summary />
      </div>
    </div>
  );
}
