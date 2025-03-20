import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import apiRequest from "../../utils/axiosUtility";

export const AdminLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Fetching token and loading state from Redux store
  const { token, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const endpoint = `${USER_API_END_POINT}/login`;
      const res = await apiRequest("POST", endpoint, input, token, dispatch);

      Cookies.set("token", res.data.token, {
        expires: 1,
        path: "",
        secure: true,
        sameSite: "None",
      });

      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(`${res.data.message}`);

      setTimeout(
        () =>
          navigate(
            res.data.user.role === "recruiter"
              ? "/recHome"
              : res.data.user.role === "admin"
              ? "/AdminHomepage"
              : "/studenthome"
          ),
        1000
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";

      toast.error(errorMessage, {
        duration: 2000, // Duration for the toast
        position: "top-center", // Position of the toast
        style: {
          backgroundColor: "red", // Background color for error
          color: "white", // Text color
          borderRadius: "8px", // Rounded corners
        },
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen herosec items-center justify-center ">
      <div className="w-full sm:w-1/2 flex items-center justify-center  shadow-lg rounded-lg ">
        <form
          onSubmit={submitHandler}
          className="sm:w-[400px] w-[300px] p-8 space-y-6 mt-10 mb-10 transform transition-all duration-300 ease-in-out "
        >
          <h1 className="font-extrabold text-3xl mb-4 text-center tracking-wide text-blue-600">
            Login to Your Account
          </h1>

          <div className="my-3 flex flex-col gap-3">
            <Label htmlFor="email" className="text-lg  font-medium text-white">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="my-3 flex flex-col gap-3">
            <Label
              htmlFor="password"
              className="text-lg font-medium text-white"
            >
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="minimum 6 characters"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
