import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState();
  const [actualPage, setActualPage] = useState();
  const [productsInCart, setProductsInCart] = useState([]);
  const [filterBrands, setFilterBrands] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  useEffect(() => {
    setProducts(data);
    return () => setProducts([]);
  }, []);
  function getProductCategory(category) {
    const productFromCategory = data.filter(
      (product) => product.type === category
    );

    setProductCategory(productFromCategory);
    return productFromCategory;
  }
  const getProduct = (product) => {
    const actualProduct = products
      ? products.filter((item) => item.slug === product)[0]
      : undefined;
    setActualPage(actualProduct);
    return actualProduct;
  };
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
  const filterByPrice = (min, max, category) => {
    let tempProd;
    if (!filterBrands) {
      const prodToFilter = getProductCategory(category);
      console.log(prodToFilter);
      setSortedProducts(prodToFilter);
      tempProd = prodToFilter.filter((prod) => {
        if ((prod.price > Number(min)) & (prod.price < Number(max))) {
          return prod;
        }
      });
    }
    if (filterBrands) {
      console.log(sortedProducts);
      const prodToFilter = sortedProducts;
      tempProd = prodToFilter.filter((prod) => {
        if ((prod.price > Number(min)) & (prod.price < Number(max))) {
          return prod;
        }
      });
      console.log(tempProd);
    }
    setFilterPrice(true);
    setProductCategory(tempProd);
  };
  const useFiltersBrand = (brand, category) => {
    let tempProd;
    if (filterPrice) {
      const prodToFilter = sortedProducts;
      tempProd = prodToFilter.filter((prod) => prod.brand === brand);
    }
    if (!filterPrice) {
      const prodToFilter = getProductCategory(category);
      setSortedProducts(prodToFilter);
      tempProd = prodToFilter.filter((prod) => prod.brand === brand);
    }

    setFilterBrands(true);
    setProductCategory(tempProd);
  };
  const useFilters = (filterName) => {
    let tempProd;
    console.log(filterName);
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
        break;
    }

    setProductCategory(tempProd);
    return productsCategory;
  };

  const getBrand = (productsCategory) => {
    let nameBrands = productsCategory
      ? productsCategory.map((prod) => prod.brand)
      : null;
    nameBrands = [...new Set(nameBrands)];
    return nameBrands;
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
        sortedProducts,
        filterByPrice,
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
        getBrand,
        useFiltersBrand,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
