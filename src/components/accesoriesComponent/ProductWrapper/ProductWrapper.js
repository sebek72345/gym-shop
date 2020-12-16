import React, { useContext, useState } from "react";
import Card from "../../Card/Card";
import SortBy from "../SortBy/SortBy";
import "./ProductWrapper.scss";
import { ProductContext } from "../../../context";

export default function ProductWrapper({ products }) {
  const { productsCategory, useFilters } = useContext(ProductContext);

  const [optionValue, setOptionValue] = useState("price-low");

  useFilters(optionValue);
  return (
    <main className="product-container">
      <div className="sorting-container">
        <p className="products-counter">
          found {products.length} products in this catergory
        </p>
        <SortBy optionValue={optionValue} setOptionValue={setOptionValue} />
      </div>
      <div className="product-wrapper">
        {productsCategory
          ? productsCategory.map((product) => (
              <Card
                price={product.price}
                previousPrice={product.previousPrice}
                name={product.name}
                slug={product.slug}
                image={product.pics[0]}
                key={product.id}
              />
            ))
          : "Something went wrong"}
      </div>
    </main>
  );
}
