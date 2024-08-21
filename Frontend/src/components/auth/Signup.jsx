import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [errors, setErrors] = useState({});

  const validateSchema = Yup.object({
    fullname: Yup.string().required("Full name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password must be at least 6 digit"),
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   "Password must contain at least one special character"
    // ),
    role: Yup.string().oneOf(
      ["student", "recruiter", "other"],
      "Role is Required"
    ),
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await validateSchema.validate(input, { abortEarly: false });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("password", input.password);
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log(formData);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response:", res.data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mx-auto max-w-7xl ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 p-4 my-10 border border-gray-400 rounded-md"
        >
          <h1 className="mb-5 text-xl font-bold">Sign Up</h1>

          <div className="flex flex-col gap-2 my-3 ">
            <Label htmlFor="fullname">
              Full Name:
              {errors.fullname && (
                <div className="text-sm font-semibold text-red-500 ">
                  {errors.fullname}
                </div>
              )}
            </Label>

            <Input
              id="fullname"
              type="text"
              placeholder="Dhruv Patel"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col gap-2 my-3 ">
            <Label htmlFor="email">
              Email:{" "}
              {errors.email && (
                <div className="text-sm font-semibold text-red-500 ">
                  {errors.email}
                </div>
              )}{" "}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col gap-2 my-3 ">
            <Label htmlFor="phoneNumber">
              Phone Number:{" "}
              {errors.phoneNumber && (
                <div className="text-sm font-semibold text-red-500 ">
                  {errors.phoneNumber}
                </div>
              )}
            </Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="+91"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col gap-2 my-3 ">
            <Label htmlFor="password">
              Password:{" "}
              {errors.password && (
                <div className="text-sm font-semibold text-red-500 ">
                  {errors.password}
                </div>
              )}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="minimum 6 characters"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between my-3 ">
            <div>
              <Label>
                Choose Your Role:{" "}
                {errors.role && (
                  <div className="text-sm font-semibold text-red-500 ">
                    {errors.role}
                  </div>
                )}
              </Label>
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
            <div>
              <Label htmlFor="profile">Profile</Label>
              <Input
                id="profile"
                type="file"
                onChange={changeFileHandler}
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <>
              <Button className="w-full my-4">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please Wait
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" className="w-full my-4">
                Signup
              </Button>
            </>
          )}
          <span className="text-[0.9rem]">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};
