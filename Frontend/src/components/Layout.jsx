import { useSelector } from "react-redux";
import { Navbar } from "./shared/Navbar";
import useCheckAuth from "../hooks/useCheckAuth";
import { Home } from "./pages/Home";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Footer from "./Footer";

function Layout() {
  useCheckAuth();
  const { apiLoading } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <Outlet />
      {apiLoading ? <Loader /> : ""}
      <Footer />
    </>
  );
}

export default Layout;
