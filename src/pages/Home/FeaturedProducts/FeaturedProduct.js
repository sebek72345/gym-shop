import React from "react";
import "./FeaturedProducts.scss";
import Card from "../../../components/Card/Card";

export default function FeaturedProduct() {
  return (
    <div className="featured-products">
      <h2 className="featured-products-header">Featured Products</h2>
      <div className="featured-products-card">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
