import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LogOut, Menu, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../../CSS/Navbar.css";
import { logOutHandler } from "../../utils/logoutHandler";

export const Navbar = () => {
  const { authUser, token } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLogout = () => {
    try {
      logOutHandler(dispatch, navigate, token);
      setIsPopoverOpen(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Logout failed. Please try again.");
    }
  };
  const handleLogo = () => {
    if (authUser && role === "recruiter") {
      navigate("/recHome");
    } else if (authUser && role === "student") {
      navigate("/studenthome");
    } else if (authUser && role === "admin") {
      navigate("/AdminHomepage");
    } else {
      navigate("/");
    }
  };

  const viewProfileHandler = () => {
    setIsPopoverOpen(false);
    console.log(authUser.role);
    
    if (authUser.role === "student") {
      navigate("/profile");
    } else if (authUser.role === "recruiter") {
      navigate("/recProfile");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#674e92] to-[#431692] text-white shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer" onClick={handleLogo}>
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Menu and Buttons */}
        <div className="flex items-center relative">
          {/* Toggle Button */}
          {authUser && (
            <button
              className="text-white focus:outline-none menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </button>
          )}

          {/* Menu */}
          <ul className={`${isMenuOpen ? "menu-open" : ""}`}>
            {role === "student" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/studentHome" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/jobs" className="hover:text-gray-300">
                    Jobs
                  </Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/browse" className="hover:text-gray-300">
                    Browse
                  </Link>
                </li>
              </>
            )}
            {role === "recruiter" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/rec/companies" className="hover:text-gray-300">
                    Company
                  </Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/rec/jobs" className="hover:text-gray-300">
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
                      authUser?.profile?.profilePhoto ||
                      "/images/default-avatar.png"
                    }
                    alt="User Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-3 bg-white shadow-md text-black">
                <div className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        authUser?.profile?.profilePhoto ||
                        "/images/default-avatar.png"
                      }
                      alt="User Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-lg">{authUser?.fullname}</h1>
                    <p className="text-sm text-gray-600">
                      {authUser?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col gap-6 p-4 items-start">
                  
                    <button
                      onClick={viewProfileHandler}
                      className="text-[#20B2AA]"
                    >
                      <User2 className="inline-block mr-2" />
                      View Profile
                    </button>
                  

                  <button className="text-red-500" onClick={handleLogout}>
                    <LogOut className="inline-block mr-2" />
                    Logout
                  </button>
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
