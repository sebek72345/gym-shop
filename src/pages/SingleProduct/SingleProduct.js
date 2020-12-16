import React, { useContext, useState, useEffect } from "react";
import StoreIcon from "@material-ui/icons/Store";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { ProductContext } from "../../context";
import Button from "../../components/Button/Button";
import InputQuantity from "../../components/InputQuantity/InputQuantity";
import TabPanel from "../../components/Tab/Tab";
import "./SingleProduct.scss";

export default function SingleProduct({
  match: {
    params: { slug },
  },
}) {
  const { getProduct, addProductToCart, actualPage } = useContext(
    ProductContext
  );
  const [quantityProduct, setQuantityProduct] = useState(1);
  const titlePage = slug;
  useEffect(() => {
    getProduct(titlePage);
    const initalAmount =
      actualPage && actualPage.amountInCart ? actualPage.amountInCart : 1;
    setQuantityProduct(initalAmount);
  }, [titlePage]);

  const deliveryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2);
  const deliveryDateString = ` ${deliveryDate.getDate()}.${
    deliveryDate.getMonth() + 1
  }.${deliveryDate.getFullYear()}`;

  const handleSubmited = (e) => {
    e.preventDefault();
    addProductToCart(titlePage, quantityProduct);
  };
  return (
    <div className="single-product-wrapper">
      {actualPage ? (
        <>
          <div className="main-information">
            <div className="single-product-image">
              <img src={actualPage.pics[0]} alt="product" />
            </div>
            <div className="product-basic-information">
              <h3>{actualPage.name}</h3>
              <h5>
                $ {actualPage.price}
                <span>$ {actualPage.previousPrice}</span>
              </h5>
              <p>
                <StoreIcon />
                In store:
                {actualPage.available ? "available" : " not available"}
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
                  disabled={actualPage.inCart}
                  maxAvailableProduct={actualPage.available}
                  addWithoutButton={false}
                />
                <Button
                  name={actualPage.inCart ? "In Card" : "Add to cart"}
                  type="submit"
                  disabled={actualPage.inCart}
                />
              </form>
            </div>
          </div>
          <TabPanel product={actualPage} />
        </>
      ) : (
        <p>Site is no available, please refresh </p>
      )}
    </div>
  );
}
