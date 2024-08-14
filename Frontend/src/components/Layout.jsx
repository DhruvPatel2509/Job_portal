import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
