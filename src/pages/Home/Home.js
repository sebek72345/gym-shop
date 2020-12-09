import React from "react";
import Hero from "./Hero/Hero";
import FeaturedProducts from "./FeaturedProducts/FeaturedProduct";
import DailyPromotion from "./DailyPromotion/DailyPromotion";
import MainWrapper from "./../../components/MainWrapper/MainWrapper";
import Discount from "./Discount/Discount";
export default function Home() {
  return (
    <div>
      <Hero />
      <MainWrapper>
        <FeaturedProducts />
        <DailyPromotion />
        <Discount />
      </MainWrapper>
    </div>
  );
}
