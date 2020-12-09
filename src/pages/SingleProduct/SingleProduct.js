import React, { useContext, useState } from "react";
import { ProductContext } from "../../context";
import Button from "../../components/Button/Button";
import StoreIcon from "@material-ui/icons/Store";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import InputQuantity from "../../components/InputQuantity/InputQuantity";
import TabPanel from "./Tab/Tab";
import "./SingleProduct.scss";
export default function SingleProduct(props) {
  const { getProduct } = useContext(ProductContext);
  const titlePage = props.match.params.slug;
  const product = getProduct(titlePage);
  const deliveryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2);
  const deliveryDateString = ` ${deliveryDate.getDate()}.${
    deliveryDate.getMonth() + 1
  }.${deliveryDate.getFullYear()}`;
  let [quantityProduct, setQuantityProduct] = useState(1);

  const handleSubmited = (e) => {
    e.preventDefault();
    console.log("Add to cart");
  };

  return (
    <div className="single-product-wrapper">
      {product ? (
        <>
          <div className="main-information">
            <div className="single-product-image">
              <img src={product.pics[0]} alt="product-image" />
            </div>
            <div className="product-basic-information">
              <h3>{product.name}</h3>
              <h5>
                {product.price}
                <span>{product.previousPrice}</span>
              </h5>
              <p>
                <StoreIcon />
                In store: {product.aviable && "available"}
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
                />
                <Button name="Add to cart" type="submit" />
              </form>
            </div>
          </div>
          <TabPanel product={product} />
        </>
      ) : (
        <p>Site is no aviable</p>
      )}
    </div>
  );
}
