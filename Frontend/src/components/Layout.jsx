import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "./shared/Navbar";
import Loader from "./Loader";
import useCheckAuth from "../hooks/useCheckAuth";

function Layout() {
  const { loading } = useSelector((store) => store.auth);
  useCheckAuth();
  console.log(loading);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader color="border-red-700" />
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Layout;
