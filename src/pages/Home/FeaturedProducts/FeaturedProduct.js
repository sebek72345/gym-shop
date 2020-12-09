import React, { useContext } from "react";
import "./FeaturedProducts.scss";
import Card from "../../../components/Card/Card";
import { ProductContext } from "../../../context";
export default function FeaturedProduct() {
  const { getFeaturedProducts } = useContext(ProductContext);
  const featured = getFeaturedProducts();
  return (
    <div className="featured-products">
      <h2 className="featured-products-header">Featured Products</h2>
      <div className="featured-products-card">
        {featured.map((card) => (
          <Card
            price={card.price}
            previousPrice={card.previousPrice}
            image={card.pics}
            name={card.name}
            slug={card.slug}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
}
