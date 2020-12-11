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
  const { getProduct, addProductToCart } = useContext(ProductContext);
  const titlePage = props.match.params.slug;
  const deliveryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2);
  const deliveryDateString = ` ${deliveryDate.getDate()}.${
    deliveryDate.getMonth() + 1
  }.${deliveryDate.getFullYear()}`;
  let [quantityProduct, setQuantityProduct] = useState(1);
  let [currentPage, setcurrentPage] = useState();

  useEffect(() => {
    const currentPage = getProduct(titlePage);
    const initalAmount = currentPage.amountInCart
      ? currentPage.amountInCart
      : 1;
    setQuantityProduct(initalAmount);
    setcurrentPage(currentPage);
  }, [titlePage]);
  const handleSubmited = (e) => {
    e.preventDefault();
    addProductToCart(titlePage, quantityProduct);
  };
  return (
    <div className="single-product-wrapper">
      {currentPage ? (
        <>
          <div className="main-information">
            <div className="single-product-image">
              <img src={currentPage.pics[0]} alt="product-image" />
            </div>
            <div className="product-basic-information">
              <h3>{currentPage.name}</h3>
              <h5>
                $ {currentPage.price}
                <span>$ {currentPage.previousPrice}</span>
              </h5>
              <p>
                <StoreIcon />
                In store: {currentPage.available && "available"}
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
                  disabled={currentPage.inCart}
                  maxAvailableProduct={currentPage.available}
                  addWithoutButton={false}
                />
                <Button
                  name={currentPage.inCart ? "In Card" : "Add to cart"}
                  type="submit"
                  disabled={currentPage.inCart}
                />
              </form>
            </div>
          </div>
          <TabPanel product={currentPage} />
        </>
      ) : (
        <p>Site is no available</p>
      )}
    </div>
  );
}
