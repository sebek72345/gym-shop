import React from "react";
import Card from "./../../Card/Card";
import "./ProductWrapper.scss";
export default function ProductWrapper({ products }) {
  return (
    <main className="product-container">
      <div className="sorting-container">
        <p className="category product-counter">
          found {products.length} products in this catergory
        </p>
        <div className="sort-by">
          <span>Sort by:</span>
          <select name="sortBy" className="sort-by-select">
            <option value="price-low">Price:descending</option>
            <option value="price-up">Price:ascending</option>
            <option value="name-low">Name: A to Z</option>
            <option value="name-up">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="product-wrapper">
        {products
          ? products.map((product) => (
              <Card
                price={product.price}
                previousPrice={product.previousPrice}
                name={product.name}
                slug={product.slug}
                image={product.pics[0]}
                key={product.id}
              />
            ))
          : "Coś poszło nie tak"}
      </div>
    </main>
  );
}
