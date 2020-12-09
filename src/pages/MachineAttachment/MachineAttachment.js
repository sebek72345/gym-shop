import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context";
import CategoryTitle from "../../components/accesoriesComponent/CategoryTitle/CategoryTitle";
import Filters from "../../components/accesoriesComponent/Filters/Filters";
import ProductWrapper from "../../components/accesoriesComponent/ProductWrapper/ProductWrapper";
export default function Mats(props) {
  const [category, setCategory] = useState("machine");
  const { productsCategory, getProductCategory, capitalize } = useContext(
    ProductContext
  );
  useEffect(() => {
    (() => {
      if (category) {
        getProductCategory(category);
      }
    })();
  }, [category]);

  const categoryTitle = capitalize(props.match.path.slice(1));
  return (
    <div>
      <CategoryTitle title={categoryTitle} />
      <div style={{ display: "flex" }}>
        <Filters />
        {productsCategory && <ProductWrapper products={productsCategory} />}
      </div>
    </div>
  );
}
