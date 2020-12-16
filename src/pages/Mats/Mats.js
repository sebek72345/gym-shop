import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context";
import CategoryTitle from "../../components/accesoriesComponent/CategoryTitle/CategoryTitle";
import Filters from "../../components/accesoriesComponent/Filters/Filters";
import ProductWrapper from "../../components/accesoriesComponent/ProductWrapper/ProductWrapper";
import "./Mats.scss";

export default function Mats({ match: { path } }) {
  const category = "mats";
  const {
    productsCategory,
    getProductCategory,
    capitalize,
    getBrand,
    setCurrentCategory,
  } = useContext(ProductContext);
  const [nameBrands, setNameBrands] = useState();
  useEffect(() => {
    (() => {
      setCurrentCategory(category);
      if (category) {
        getProductCategory(category);
        const temp = getProductCategory(category);
        setNameBrands(getBrand(temp));
      }
    })();
  }, []);
  const categoryTitle = capitalize(path.slice(1));
  return (
    <div>
      <CategoryTitle title={categoryTitle} />
      <div className="category-wrapper">
        {nameBrands && <Filters category={category} brands={nameBrands} />}
        {productsCategory && <ProductWrapper products={productsCategory} />}
      </div>
    </div>
  );
}
