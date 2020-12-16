import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { routes } from "../../../routes";
import "./DailyPromotion.scss";
import CountDown from "./CountDown/CountDown";
import gymSetIcon from "../../../assets/gymset.png";
import { ProductContext } from "../../../context";

export default function DailyPromotion() {
  const { productPromotion } = useContext(ProductContext);
  return (
    <div className="daily-promotion">
      {productPromotion && (
        <>
          <div className="daily-promotion-timer">
            <h3>Daily Promotion</h3>
            <CountDown />
          </div>
          <div className="daily-promotion-pic">
            <img
              src={productPromotion[0].pics[0]}
              alt="dumbbell"
              className="daily-promotion-pic-img"
            />
          </div>
          <div className="daily-promotion-description">
            <h2>{productPromotion[0].name}</h2>

            <div className="daily-promotion-description-price">
              <h3 className="daily-promotion-description-price-actual">
                ${productPromotion[0].price}
                <span className="daily-promotion-description-price-previous">
                  ${productPromotion[0].previousPrice}
                </span>
              </h3>
            </div>
            <div className="daily-promotion-button-wrapper">
              <button type="button" className="daily-promotion-button">
                <Link to={`/products/${productPromotion[0].slug}`}>
                  Check promotion
                </Link>
              </button>
              <ArrowRightAltIcon className="daily-promotion-button-arrow" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
