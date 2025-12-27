import React from "react";
import ThreeSteps from "../components/Home/ThreeSteps";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import SuccessStories from "../components/Home/SuccessStories";
import PricingPlans from "../components/Home/PricingPlans";
import HeroSection from "../components/Home/HeroSection";

const Home = () => {
  return (
    <div className="space-y-16">
      <HeroSection/>
      <ThreeSteps/>
      <WhyChooseUs/>
      <SuccessStories/>
      <PricingPlans/>
    </div>
  );
};

export default Home;

