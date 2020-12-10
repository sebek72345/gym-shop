import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [products, setProducts] = useState();
  const [currentProducts, setCurrentProducts] = useState();
  const [productsInCart, setProductsInCart] = useState([]);
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
  const addProductToCart = (name, amount) => {
    const temp = currentProducts;
    temp.inCart = true;
    temp.amountInCart += amount;
    setProductsInCart([...productsInCart, temp]);
    window.localStorage.setItem(
      "inCart",
      JSON.stringify([...productsInCart, temp])
    );
  };
  const removeItemFromCart = (name) => {
    getProduct(name);
    const removeItem = productsInCart.filter((product) => product.name == name);
    const temp = productsInCart.filter((product) => product.name !== name);
    console.log({ removeItem, temp });
    removeItem.inCart = false;
    removeItem.amountInCart = 0;
    setProducts([...temp, removeItem]);
    setProductsInCart(temp);
  };
  const getAmounProductInCart = (name) => {
    getProduct(name);
    return currentProducts.amountInCart;
  };

  const increaseProductInCart = (name, number) => {
    const temp = getProduct(name);
    currentProducts += number;
    const arrayCart = productsInCart.filter((product) => product.slug !== name);
    console.log(arrayCart);
  };
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
    const actualProduct = products
      ? products.filter((item) => item.slug === product)[0]
      : undefined;
    setCurrentProducts(actualProduct);
    return actualProduct;
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
        currentProducts,
        getProductCategory,
        capitalize,
        getFeaturedProducts,
        productsCategory,
        productsInCart,
        getProduct,
        removeItemFromCart,
        addProductToCart,
        getAmounProductInCart,
        increaseProductInCart,
        /* changeProductInCart, */
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
