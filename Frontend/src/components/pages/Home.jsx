import React from "react";
import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import Footer from "../Footer";

export const Home = () => {
  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
      <Footer />
    </>
  );
};
