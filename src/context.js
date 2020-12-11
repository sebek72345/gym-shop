import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [products, setProducts] = useState();
  const [actualPage, setActualPage] = useState();
  const [productsInCart, setProductsInCart] = useState([]);
  const [filter, setFilter] = useState();
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
    const temp = actualPage;
    temp.inCart = true;
    temp.amountInCart += amount;
    const tempAllProd = products;
    tempAllProd.map((prod) => {
      if (prod.slug === name) {
        return temp;
      } else return prod;
    });
    setProductsInCart([temp, ...productsInCart]);
    setProducts(tempAllProd);
    window.localStorage.setItem(
      "inCart",
      JSON.stringify([temp, ...productsInCart])
    );
  };
  const removeItemFromCart = (name) => {
    const temp = productsInCart.filter((product) => product.slug !== name);

    const tempAllProd = products;
    tempAllProd.map((prod) => {
      if (prod.slug === name) {
        prod.inCart = false;
        prod.amountInCart = 0;
      }
    });

    setProducts(tempAllProd);
    setProductsInCart(temp);
  };

  const increaseProductInCart = (name) => {
    changeProductInCart(name, 1);
  };
  const decreaseProductInCart = (name) => {
    changeProductInCart(name, -1);
  };
  const changeProductInCart = (name, action) => {
    const temp = getProduct(name);
    if (action === -1 && temp.amountInCart === 0)
      return removeItemFromCart(name);
    if (action === 1 && temp.available <= temp.amountInCart) return;
    console.log(temp.amountInCart);
    temp.amountInCart += action;
    console.log(temp);
    console.log((temp.amountInCart += action));
    const arrayCart = productsInCart.map((product) => {
      if (product.slug === name) {
        return (product = temp);
      } else return product;
    });

    setProductsInCart([...arrayCart]);
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
  const useFilters = (filterName) => {
    let tempProd;
    switch (filterName) {
      case "price-low":
        tempProd = productsCategory.sort((first, second) => {
          if (first.price < second.price) {
            return 1;
          }
          if (first.price > second.price) {
            return -1;
          }
        });
        break;
      case "price-up":
        tempProd = productsCategory.sort((first, second) => {
          if (first.price > second.price) {
            return 1;
          }
          if (first.price < second.price) {
            return -1;
          }
        });
        break;
      case "name-low":
        tempProd = productsCategory.sort((first, second) => {
          if (first.name > second.name) {
            return 1;
          }
          if (first.name < second.name) {
            return -1;
          }
        });
        break;
      case "name-up":
        tempProd = productsCategory.sort((first, second) => {
          if (first.name < second.name) {
            return 1;
          }
          if (first.name > second.name) {
            return -1;
          }
        });
        break;
      default:
        return productsCategory;
        break;
    }
    const a = tempProd.map((a) => a.price);

    console.log(tempProd);
    setProductCategory(tempProd);
    return productsCategory;
  };
  const getProduct = (product) => {
    const actualProduct = products
      ? products.filter((item) => item.slug === product)[0]
      : undefined;
    setActualPage(actualProduct);
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
        decreaseProductInCart,
        actualPage,
        getProductCategory,
        capitalize,
        getFeaturedProducts,
        productsCategory,
        productsInCart,
        getProduct,
        removeItemFromCart,
        addProductToCart,
        increaseProductInCart,
        products,
        useFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
