import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const { token } = useSelector((store) => store.auth);

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const endpoint = `${USER_API_END_POINT}/login`;
      const res = await apiRequest("POST", endpoint, input, token);

      // Set the token in a cookie
      Cookies.set("token", res.data.token, {
        expires: 1, // Optional: cookie expires in 7 days
        path: "", // Optional: cookie is available in all paths
        secure: true, // Set to true if using HTTPS
        sameSite: "None", // Necessary for cross-site requests
      });

      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(res.data.message);

      setTimeout(
        () =>
          navigate(
            res.data.user.role === "recruiter" ? "/admin/companies" : "/"
          ),
        1000
      );
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto min-h-[77.2vh]">
      <form
        onSubmit={submitHandler}
        className="sm:w-[400px] w-[300px] border border-gray-400 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>

        <div className="my-3 flex flex-col gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            required
          />
        </div>

        <div className="my-3 flex flex-col gap-2">
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            placeholder="minimum 6 characters"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            required
          />
        </div>

        <div className="flex items-center justify-between my-3">
          <div>
            <Label>Choose Your Role</Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type="radio"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type="radio"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button type="submit" className="w-full my-4" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </>
          ) : (
            "Login"
          )}
        </Button>

        <span className="text-[0.9rem]">
          Don't have an account?
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};
