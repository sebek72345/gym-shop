import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [products, setProducts] = useState();
  const [productsInCart, setProductsInCart] = useState([
    ["buty", 3],
    ["rękawice", 5],
  ]);
  const [featuredProducts, setFeaturedProducts] = useState();
  useEffect(() => {
    setProducts(data);
    return () => setProducts([]);
  }, []);
  function getProductCategory(category) {
    const productFromCategory = data.filter(
      (product) => product.type === category
    );
    setProductCategory(productFromCategory);
  }
  /*  const reduceInCart = () => {
    const res = Object.entries(
      productsInCart.reduce((acc, [name, value]) => {
        if (!acc[name]) {
          acc[name] = value;
        } else {
          acc[name] += value;
        }

        return acc;
      }, {})
    ).map(([name, value]) => [name, value]);

    console.log(res);
  }; */
  /* const changeProductInCart = (add) => {
    setProductsInCart([...productsInCart, add]);
    reduceInCart();
  }; */
  const getProduct = (product) => {
    const currentProduct = products
      ? products.filter((item) => item.slug === product)[0]
      : undefined;

    return currentProduct;
  };
  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };
  const getFeaturedProducts = () => {
    const featured = data.filter((product) => product.featured);
    return featured;
  };
  return (
    <ProductContext.Provider
      value={{
        getProduct,
        getProductCategory,
        capitalize,
        getFeaturedProducts,
        productsCategory,
        productsInCart,
        /* changeProductInCart, */
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
