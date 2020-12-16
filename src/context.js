import React, { createContext, useState, useEffect } from "react";
import data from "./data";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productsCategory, setProductCategory] = useState();
  const [productPromotion, setProductsPromotion] = useState();
  const [products, setProducts] = useState(data);
  const [actualPage, setActualPage] = useState();
  const [productsInCart, setProductsInCart] = useState([]);
  const [filterBrands, setFilterBrands] = useState();
  const [filterPrice, setFilterPrice] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [userHaveDiscount, setUserHaveDiscount] = useState(false);
  useEffect(() => {
    setProductsPromotion(data.filter((item) => item.id === 3));

    const getItems = window.localStorage.getItem("productsInCartStorage");
    if (getItems) {
      setProductsInCart(JSON.parse(getItems));
    }
  }, []);
  function getProductCategory(category) {
    const productFromCategory = data.filter(
      (product) => product.type === category
    );

    setProductCategory(productFromCategory);
    return productFromCategory;
  }
  const componentFilter = (category) => {
    let filteredProduct;
    filteredProduct = getProductCategory(category);
    if (filterBrands) {
      filteredProduct = filteredProduct.filter(
        (prod) => prod.brand === filterBrands
      );
    }
    if (filterPrice) {
      filteredProduct = filteredProduct.filter((prod) => {
        if (
          prod.price > Number(filterPrice[0]) &&
          prod.price < Number(filterPrice[1])
        ) {
          return prod;
        }
        return null;
      });
    }
    setProductCategory(filteredProduct);
  };
  useEffect(() => {
    componentFilter(currentCategory);
  }, [filterBrands, filterPrice, currentCategory]);
  useEffect(() => {
    if (productsInCart.length) {
      window.localStorage.setItem(
        "productsInCartStorage",
        JSON.stringify(productsInCart)
      );
      console.log(products);
      console.log(productsInCart);
      const tempProd = [
        ...products.map((item) => {
          const temp = productsInCart.map((product) => {
            console.log({ item, product });
            if (item.id === product.id) {
              return product;
            }
            return item;
          });

          return temp[0];
        }),
      ];
      console.log(tempProd);
      setProducts(tempProd);
    }
  }, [productsInCart, currentCategory]);

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
      }
      return prod;
    });
    let numberItemInCard = productsInCart ? productsInCart.length : 0;
    document.title = `Gym shop (${++numberItemInCard})`;
    setProductsInCart([temp, ...productsInCart]);
    setProducts(tempAllProd);
  };
  const removeItemFromCart = (name) => {
    const newProductsInCart = productsInCart.filter(
      (product) => product.slug !== name
    );
    const tempAllProd = products.map((prod) => {
      if (prod.slug === name) {
        prod.inCart = false;
        prod.amountInCart = 0;
      }
      return prod;
    });
    setProducts(tempAllProd);
    setProductsInCart(newProductsInCart);
  };
  const changeProductInCart = (name, action) => {
    const temp = getProduct(name);
    if (action === -1 && temp.amountInCart === 0)
      return removeItemFromCart(name);
    if (action === 1 && temp.available <= temp.amountInCart) {
      return null;
    }
    const newProductsInCart = productsInCart.map((product) => {
      if (product.slug === name) {
        product.amountInCart += action;
      }
      return product;
    });

    setProductsInCart([...newProductsInCart]);
    return null;
  };
  const increaseProductInCart = (name) => {
    changeProductInCart(name, 1);
  };
  const decreaseProductInCart = (name) => {
    changeProductInCart(name, -1);
  };

  const filterByPrice = (min, max) => {
    setFilterPrice([min, max]);
  };

  const filterByBrand = (brand) => {
    setFilterBrands(brand);
  };

  const useFilters = (filterName) => {
    let tempProd;

    switch (filterName) {
      case "price-low":
        tempProd = productsCategory.sort((first, second) => {
          if (first.price <= second.price) {
            return 1;
          }
          return -1;
        });
        break;
      case "price-up":
        tempProd = productsCategory.sort((first, second) => {
          if (first.price >= second.price) {
            return 1;
          }
          return -1;
        });
        break;
      case "name-low":
        tempProd = productsCategory.sort((first, second) => {
          if (first.name >= second.name) {
            return 1;
          }
          return -1;
        });
        break;
      case "name-up":
        tempProd = productsCategory.sort((first, second) => {
          if (first.name <= second.name) {
            return 1;
          }
          return -1;
        });
        break;
      default:
        break;
    }
    setProductCategory(tempProd);
    return productsCategory;
  };
  const resetFilters = () => {
    setFilterBrands();
    setFilterPrice();
    [...document.querySelectorAll("input[name='filter-value']")].forEach(
      (input) => {
        input.checked = false;
      }
    );
    [...document.querySelectorAll("input[name='brandRadio']")].forEach(
      (input) => {
        input.checked = false;
      }
    );
    getProductCategory(currentCategory);
  };
  const getBrand = (productsInCategory) => {
    let nameBrands = productsInCategory
      ? productsInCategory.map((prod) => prod.brand)
      : null;
    nameBrands = [...new Set(nameBrands)];
    return nameBrands;
  };
  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
  const getFeaturedProducts = () => {
    const featured = data.filter((product) => product.featured);
    return featured;
  };
  return (
    <ProductContext.Provider
      value={{
        currentCategory,
        setCurrentCategory,
        filterByPrice,
        decreaseProductInCart,
        actualPage,
        getProductCategory,
        capitalize,
        getFeaturedProducts,
        productsCategory,
        setProductsInCart,
        productsInCart,
        getProduct,
        removeItemFromCart,
        addProductToCart,
        increaseProductInCart,
        useFilters,
        getBrand,
        filterByBrand,
        resetFilters,
        productPromotion,
        currentUser,
        setCurrentUser,
        userHaveDiscount,
        products,
        setUserHaveDiscount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
