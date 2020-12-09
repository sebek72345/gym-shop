import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [products, setProducts] = useState();
  useEffect(() => {
    setProducts(data);
    return () => {
      setProducts([]);
    };
  }, []);
  const getProductCategory = (category) => {
    const productFromCategory = data.filter((product) => {
      console.log(product.type === category);
      return product.type === category;
    });

    return productFromCategory;
  };
  const getProduct = (product) => {
    const currentProduct = products
      ? products.filter((item) => item.slug === product)[0]
      : undefined;
    return currentProduct;
  };
  return (
    <ProductContext.Provider value={{ getProduct, getProductCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
