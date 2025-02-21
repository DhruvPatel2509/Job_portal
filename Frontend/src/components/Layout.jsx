import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import useCheckAuth from "../hooks/useCheckAuth";
import Loader from "./Loader";
import Footer from "./Footer";
import { Navbar } from "./ui/Navbar";

function Layout() {
  
  
  useCheckAuth();

  const { apiLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <Navbar />

      <main className="relative flex-grow min-h-[567px]">
        <Outlet />
        {apiLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <Loader />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
