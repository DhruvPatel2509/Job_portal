import { useEffect, useState } from "react";
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
import { Mail, Lock, User, Phone, Upload } from "lucide-react";

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student", // Default role
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      // Limit to 2MB
      toast.error("File size must be less than 2MB.");
    } else {
      setInput((prev) => ({ ...prev, file }));
      console.log(file.name);
    }
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
      const res = await apiRequest("POST", endpoint, formData);

      toast.success(`${res.data.message}`);
      navigate("/login");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        toast.error(
          error?.response?.data?.message || "An error occurred during signup"
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  herosec ">
      <div className="flex gap-5 max-w-7xl items-center justify-around shadow-lg rounded-xl sm:flex-col md:flex-row">
        {/* Left Section */}
        <div className="hidden sm:flex flex-col items-start justify-center p-5 rounded-xl text-white rounded-l-xl sm:w-[70%]">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">Job Portal</span>
          </h1>
          <p className="text-lg leading-relaxed">
            Connecting recruiters with the right talent and empowering students
            to find their dream jobs. Our platform makes job searching and
            posting seamless and efficient.
          </p>
          <ul className="mt-4 text-base space-y-2 list-disc pl-5">
            <li>Explore diverse job opportunities across industries.</li>
            <li>Post job openings to attract top candidates.</li>
            <li>Streamline your hiring and application process.</li>
          </ul>
          <div className="mt-6">
            <p className="text-sm text-gray-200">
              Already registered?{" "}
              <a href="/login" className="text-yellow-300 hover:underline">
                Login now
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-5 sm:w-[65%] w-[80%]">
          <div className="text-center ">
            <h2 className="text-3xl font-bold text-blue-600 ">
              Create Your Account
            </h2>
            <p className="mt-2 text-white">
              Start exploring opportunities tailored for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 ">
            {["fullname", "email", "phoneNumber", "password"].map(
              (field, idx) => (
                <div key={field} className="relative">
                  <Label
                    htmlFor={field}
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")}
                  </Label>
                  <div className="flex items-center">
                    <span className="absolute left-3 text-gray-400">
                      {idx === 0 ? (
                        <User />
                      ) : idx === 1 ? (
                        <Mail />
                      ) : idx === 2 ? (
                        <Phone />
                      ) : (
                        <Lock />
                      )}
                    </span>
                    <Input
                      id={field}
                      type={field === "password" ? "password" : "text"}
                      placeholder={
                        field === "phoneNumber"
                          ? "e.g. 9876543210"
                          : `Enter your ${field}`
                      }
                      name={field}
                      value={input[field]}
                      onChange={handleChange}
                      className="w-full px-10 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors[field] && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors[field]}
                    </div>
                  )}
                </div>
              )
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label className="block mb-2 text-sm font-medium text-white">
                  Choose Your Role:
                </Label>
                <RadioGroup className="flex gap-4">
                  {["student", "recruiter"].map((role) => (
                    <div key={role} className="flex items-center">
                      <Input
                        id={role}
                        type="radio"
                        checked={input.role === role}
                        onChange={handleChange}
                        name="role"
                        value={role}
                        className="focus:ring-blue-500"
                      />
                      <Label htmlFor={role} className="ml-2 text-sm text-white">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                {!input.file && (
                  <Label
                    htmlFor="file"
                    className="block mb-2 text-sm font-medium text-white cursor-pointer"
                  >
                    Upload Profile Picture
                  </Label>
                )}
                <div className="relative flex items-center">
                  {input.file !== null ? (
                    <p className="text-red-500">{input.file?.name}</p>
                  ) : (
                    <>
                      <span className="absolute left-3 text-gray-400">
                        <Upload />
                      </span>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full cursor-pointer px-10 py-3 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="mt-4 text-center text-sm text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
