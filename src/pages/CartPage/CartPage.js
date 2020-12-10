import React, { useContext } from "react";
import "./CartPage.scss";
import { ProductContext } from "../../context";
import Summary from "../../components/Summary/Summary";
import ProductInCart from "../../components/ProductInCart/ProductInCart";
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
                <ProductInCart
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.pics}
                  amount={product.amountInCart}
                  link={product.slug}
                  maxAvailableProduct={product.available}
                />
              ))}
            </div>

            <Summary />
          </div>
        </>
      ) : (
        <p>Koszyk pusty</p>
      )}
    </div>
  );
}
