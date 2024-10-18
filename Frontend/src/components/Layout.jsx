import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setLoading,
  setAuthUser,
  clearAuthUser,
  setToken,
} from "../redux/authSlice"; // Adjust the import path
import { USER_API_END_POINT } from "../utils/constant"; // Adjust the import path
import { Navbar } from "./shared/Navbar";
import Cookies from "js-cookie";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        dispatch(setAuthUser(res.data.user));
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Get the token cookie
    const token = Cookies.get("token");
    dispatch(setToken(token));

    if (token) {
      checkAuth();
    } else {
      dispatch(clearAuthUser(null));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
