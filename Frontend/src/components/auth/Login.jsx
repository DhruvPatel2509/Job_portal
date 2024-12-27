import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import apiRequest from "../../utils/axiosUtility";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
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
      const res = await apiRequest("POST", endpoint, input, token);

      Cookies.set("token", res.data.token, {
        expires: 1,
        path: "",
        secure: true,
        sameSite: "None",
      });

      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(`${res.data.message}`, {
        duration: 1500,
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
          borderRadius: "8px",
        },
      });

      setTimeout(
        () =>
          navigate(
            res.data.user.role === "recruiter" ? "/admin/companies" : "/"
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
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full hidden sm:flex sm:w-1/2 p-8 bg-gradient-to-b from-purple-600 to-blue-600 text-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Circle Decorations */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full transform -translate-x-10 -translate-y-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-10 translate-y-10 animate-pulse"></div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
          Welcome to Our Website
        </h1>

        {/* Subheading */}
        <p className="text-lg leading-relaxed text-center max-w-md drop-shadow-md">
          Discover new opportunities, connect with like-minded individuals, and
          unlock your potential. Let’s make your journey memorable and
          impactful.
        </p>

        {/* Decorative Divider */}
        <div className="mt-6 w-24 h-1 bg-white rounded-full"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white shadow-lg rounded-lg">
        <form
          onSubmit={submitHandler}
          className="sm:w-[400px] w-[300px] p-8 space-y-6 mt-10 mb-10 transform transition-all duration-300 ease-in-out "
        >
          <h1 className="font-extrabold text-3xl text-gray-800 mb-4 text-center tracking-wide">
            Login to Your Account
          </h1>

          <div className="my-3 flex flex-col gap-3">
            <Label
              htmlFor="email"
              className="text-lg text-gray-800 font-medium"
            >
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
              className="text-lg text-gray-800 font-medium"
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

          <div className="my-3">
            <Label className="text-lg text-gray-800 font-medium">
              Choose Your Role
            </Label>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center">
                <Input
                  id="student"
                  type="radio"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="ml-2 text-gray-800">
                  Student
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="recruiter"
                  type="radio"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="ml-2 text-gray-800">
                  Recruiter
                </Label>
              </div>
            </div>
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

          <p className="text-sm text-gray-800 mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
