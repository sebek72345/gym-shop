import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { ProductsInCartRender } from "../../../pages/CartPage/CartPage";
import Button from "../../Button/Button";
import { ProductContext } from "../../../context";
import "./Cart.scss";

function Cart() {
  const { productsInCart } = useContext(ProductContext);
  const [amount, setAmount] = useState(0);
  const [visabilityModal, setVisabilityModal] = useState(false);

  useEffect(() => {
    if (productsInCart.length) {
      setAmount(productsInCart.length);
    }
  }, [productsInCart]);
  return (
    <div className="cart">
      <div
        className="card-icon"
        onClick={() => setVisabilityModal(!visabilityModal)}
        onKeyDown={() => setVisabilityModal(!visabilityModal)}
        role="button"
        tabIndex={-1}
      >
        <div className="cart-amount">
          <p>{amount}</p>
        </div>
        <ShoppingCartIcon style={{ fontSize: "52px" }} />
        <p className="cart-name">Cart</p>
      </div>
      {visabilityModal && (
        <div className="modal-cart">
          <div className="cart-scroller">
            <ProductsInCartRender
              small
              setVisabilityModal={setVisabilityModal}
              visabilityModal={visabilityModal}
            />
          </div>
          <Link
            style={{ display: "block", width: "100%", textAlign: "center" }}
            to={routes.cart}
            onClick={() => setVisabilityModal(!visabilityModal)}
          >
            <Button name="Go to cart" />
          </Link>
        </div>
      )}
    </div>
  );
}
const MemorizedCart = React.memo(Cart);
export default MemorizedCart;
