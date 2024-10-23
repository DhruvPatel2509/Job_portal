import { useEffect, useState } from "react";
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
import apiRequest from "../../utils/axiosUtility";

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: Yup.string().oneOf(
      ["student", "recruiter", "other"],
      "Role is required"
    ),
  });

  const { loading, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);
  const { token } = useSelector((store) => store.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(input, { abortEarly: false });
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });

      dispatch(setLoading(true));
      const endpoint = `${USER_API_END_POINT}/register`;
      const res = await apiRequest("POST", endpoint, formData, token);

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mx-auto max-w-7xl">
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 my-10 border border-gray-400 rounded-md md:w-3/4 lg:w-1/2"
      >
        <h1 className="mb-5 text-xl font-bold text-center">Sign Up</h1>

        {["fullname", "email", "phoneNumber", "password"].map((field) => (
          <div key={field} className="flex flex-col gap-2 my-3">
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
              :
              {errors[field] && (
                <div className="text-sm font-semibold text-red-500">
                  {errors[field]}
                </div>
              )}
            </Label>
            <Input
              id={field}
              type={field === "password" ? "password" : "text"}
              placeholder={
                field === "phoneNumber" ? "e.g. 9876543210" : `Your ${field}`
              }
              name={field}
              value={input[field]}
              onChange={handleChange}
              className="placeholder-gray-500"
            />
          </div>
        ))}

        <div className="flex flex-col gap-4 my-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Label>
              Choose Your Role:{" "}
              {errors.role && (
                <div className="text-sm font-semibold text-red-500">
                  {errors.role}
                </div>
              )}
            </Label>
            <RadioGroup className="flex items-center gap-4">
              {["student", "recruiter"].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Input
                    id={role}
                    type="radio"
                    checked={input.role === role}
                    onChange={handleChange}
                    name="role"
                    value={role}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={role} className="cursor-pointer">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="file">Profile Picture</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="cursor-pointer"
            />
          </div>
        </div>

        <Button type="submit" className="w-full my-4" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Signup"
          )}
        </Button>

        <span className="text-[0.9rem] block text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
