import { useSelector } from "react-redux";
import { Navbar } from "./shared/Navbar";
import useCheckAuth from "../hooks/useCheckAuth";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Footer from "./Footer";

function Layout() {
  useCheckAuth();
  const { apiLoading } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <main className="min-h-[567px]">
        <Outlet />
        {apiLoading && <Loader />}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
