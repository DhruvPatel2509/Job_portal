import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser, setToken } from "../../redux/authSlice";
import {
  setAllJobs,
  setAllJobsAdmin,
  setSingleJob,
} from "../../redux/jobSlice";
import { setAllCompanies } from "../../redux/companySlice";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";
import "../../CSS/Navbar.css";

export const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      const endpoint = `${USER_API_END_POINT}/logOut`;
      const res = await apiRequest("GET", endpoint, {}, token);
      setIsPopoverOpen(false);
      if (res.data.success) {
        toast.success(`${res.data.message}`, {
          duration: 1500,
          position: "top-center",
          style: {
            backgroundColor: "green",
            color: "white",
            borderRadius: "8px",
          },
        });
        dispatch(setAuthUser(null));
        dispatch(setSingleJob(null));
        dispatch(setAllJobs(null));
        dispatch(setAllCompanies(null));
        dispatch(setToken(""));
        dispatch(setAllJobsAdmin(null));
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.", {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
          borderRadius: "8px",
        },
      });
    }
  };

  const handleLogo = () => {
    if (authUser && authUser.role === "recruiter") {
      navigate("/admin/companies");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#674e92] to-[#431692] text-white shadow-md  z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer" onClick={handleLogo}>
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Menu and Buttons */}
        <div className="flex items-center relative">
          {/* Toggle Button */}
          <button
            className="text-white focus:outline-none menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Menu */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            }  flex-col lg:flex-row lg:flex items-center gap-4 ml-4 absolute top-[55px] bg-transparent text-white`}
          >
            {role === "student" ? (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-gray-300">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-gray-300">
                    Browse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-gray-300">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-gray-300">
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User Profile */}
          {authUser ? (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger>
                <Avatar className="cursor-pointer ml-4">
                  <AvatarImage
                    src={
                      authUser?.profile?.profilePhoto || "default-avatar.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 bg-white shadow-md text-black">
                <div className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        authUser?.profile?.profilePhoto || "default-avatar.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-lg">{authUser?.fullname}</h1>
                    <p className="text-sm text-gray-600">
                      {authUser?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  {role === "student" && (
                    <Link to="/profile">
                      <Button variant="link" className="text-[#20B2AA]">
                        <User2 className="inline-block mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="link"
                    className="text-red-500"
                    onClick={logOutHandler}
                  >
                    <LogOut className="inline-block mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="ml-4 flex gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-[#20B2AA]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F83002] text-white hover:bg-red-600">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
