import { useSelector } from "react-redux";
import { Navbar } from "./shared/Navbar";
import useCheckAuth from "../hooks/useCheckAuth";
import { Home } from "./pages/Home";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

function Layout() {
  useCheckAuth();
  const { apiLoading } = useSelector((store) => store.auth);
  console.log(apiLoading);

  return (
    <>
      <Navbar />
      <Outlet />
      {apiLoading ? <Loader /> : ""}
    </>
  );
}

export default Layout;
