import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context";
import CategoryTitle from "../../components/accesoriesComponent/CategoryTitle/CategoryTitle";
import Filters from "../../components/accesoriesComponent/Filters/Filters";
import ProductWrapper from "../../components/accesoriesComponent/ProductWrapper/ProductWrapper";
export default function Mats() {
  const { getProductCategory } = useContext(ProductContext);
  const mats = getProductCategory("mats");

  return (
    <div>
      <CategoryTitle />
      <div style={{ display: "flex" }}>
        <Filters />
        {mats && <ProductWrapper products={mats} />}
      </div>
    </div>
  );
}
