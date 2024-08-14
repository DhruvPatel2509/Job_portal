import React from "react";
import { Navbar } from "../shared/Navbar";
import { Outlet } from "react-router-dom";
import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
    </>
  );
};
