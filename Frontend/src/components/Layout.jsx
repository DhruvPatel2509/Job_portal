import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setAuthUser,
  clearAuthUser,
  setToken,
} from "../redux/authSlice"; // Adjust the import path
import { USER_API_END_POINT } from "../utils/constant"; // Adjust the import path
import { Navbar } from "./shared/Navbar";
import Cookies from "js-cookie";
import apiRequest from "../utils/axiosUtility";

function Layout() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((store) => store.auth); // Include loading in the selector

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));

      try {
        const endpoint = `${USER_API_END_POINT}/me`;
        const res = await apiRequest("GET", endpoint, {}, token);

        if (res?.data?.user) {
          dispatch(setAuthUser(res.data.user));
        } else {
          dispatch(clearAuthUser());
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(clearAuthUser());
        // Optionally, you can set an error message in the Redux store here for user feedback.
      } finally {
        dispatch(setLoading(false));
      }
    };
    // Get the token from cookies
    const cookieToken = Cookies.get("token");
    if (cookieToken && cookieToken !== token) {
      dispatch(setToken(cookieToken));
    }

    // If token is available, check authentication
    if (cookieToken) {
      checkAuth();
    } else {
      dispatch(clearAuthUser());
    }
  }, [dispatch, token]); // Removed checkAuth from dependencies

  return (
    <>
      {loading && <div>Loading...</div>} {/* Loading indicator */}
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
