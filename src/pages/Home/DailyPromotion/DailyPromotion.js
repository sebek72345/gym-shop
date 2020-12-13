import React from "react";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import "./DailyPromotion.scss";
import CountDown from "./CountDown/CountDown";
import gymSetIcon from "../../../assets/gymset.png";

export default function DailyPromotion() {
  return (
    <div className="daily-promotion">
      <div className="daily-promotion-timer">
        <h3>Daily Promotion</h3>
        <CountDown />
      </div>
      <div className="daily-promotion-pic">
        <img
          src={gymSetIcon}
          alt="dumbbell"
          className="daily-promotion-pic-img"
        />
      </div>
      <div className="daily-promotion-description">
        <h2>Suplements set</h2>
        <h5>ISO WHEY + IMEGA 3 + BCAA ZERO + BLACK BURN + SHAKER</h5>
        <div className="daily-promotion-description-price">
          <h3 className="daily-promotion-description-price-actual">
            $ 50
            <span className="daily-promotion-description-price-previous">
              $75
            </span>
          </h3>
        </div>
        <div className="daily-promotion-button-wrapper">
          <button type="button" className="daily-promotion-button">
            Check promotion
          </button>
          <ArrowRightAltIcon className="daily-promotion-button-arrow" />
        </div>
      </div>
    </div>
  );
}
