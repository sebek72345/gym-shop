import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context";
import Button from "../../components/Button/Button";
import StoreIcon from "@material-ui/icons/Store";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import InputQuantity from "../../components/InputQuantity/InputQuantity";
import TabPanel from "./Tab/Tab";
import "./SingleProduct.scss";
export default function SingleProduct(props) {
  const { currentProducts, getProduct, addProductToCart } = useContext(
    ProductContext
  );
  const titlePage = props.match.params.slug;
  const deliveryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2);
  const deliveryDateString = ` ${deliveryDate.getDate()}.${
    deliveryDate.getMonth() + 1
  }.${deliveryDate.getFullYear()}`;
  let [quantityProduct, setQuantityProduct] = useState(1);
  useEffect(() => {
    getProduct(titlePage);
    console.log(titlePage);
  }, []);
  const handleSubmited = (e) => {
    e.preventDefault();
    addProductToCart(titlePage, quantityProduct);
  };
  return (
    <div className="single-product-wrapper">
      {currentProducts ? (
        <>
          <div className="main-information">
            <div className="single-product-image">
              <img src={currentProducts.pics[0]} alt="product-image" />
            </div>
            <div className="product-basic-information">
              <h3>{currentProducts.name}</h3>
              <h5>
                $ {currentProducts.price}
                <span>$ {currentProducts.previousPrice}</span>
              </h5>
              <p>
                <StoreIcon />
                In store: {currentProducts.available && "available"}
              </p>
              <p>
                <LocalShippingIcon />
                Free dilivery
              </p>
              <p>
                <QueryBuilderIcon />
                At your place on:
                {deliveryDateString}
              </p>
              <form onSubmit={handleSubmited}>
                <InputQuantity
                  quantity={quantityProduct}
                  setQuantity={setQuantityProduct}
                  disabled={currentProducts.inCart}
                  maxAvailableProduct={currentProducts.available}
                />
                <Button
                  name={currentProducts.inCart ? "In Card" : "Add to cart"}
                  type="submit"
                  disabled={currentProducts.inCart}
                />
              </form>
            </div>
          </div>
          <TabPanel product={currentProducts} />
        </>
      ) : (
        <p>Site is no available</p>
      )}
    </div>
  );
}
