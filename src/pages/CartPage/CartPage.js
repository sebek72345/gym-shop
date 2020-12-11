import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import "./CartPage.scss";
import { ProductContext } from "../../context";
import Summary from "../../components/Summary/Summary";
import ProductInCart from "../../components/ProductInCart/ProductInCart";
import Button from "../../components/Button/Button";
export default function CartPage() {
  const { productsInCart } = useContext(ProductContext);
  console.log();
  return (
    <div className="cart-page-wrapper">
      {productsInCart.length ? (
        <>
          <h3 className="cart-page-title">Shopping cart contents:</h3>
          <div className="products">
            <div className="products-in-cart">
              {productsInCart.map((product) => (
                <ProductInCart key={product.id} product={product} />
              ))}
            </div>

            <Summary />
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <span className="empty-cart-text">The cart is empty.</span>
          <span className="empty-cart-text">You can add some extra stuff</span>
          <Link to={routes.mats} className="empty-cart-link">
            Click me
          </Link>
        </div>
      )}
    </div>
  );
}
