import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser } from "../../redux/authSlice";

export const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logOut`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-[#ffffff] mb-3">
        <div className="flex items-center justify-between mx-auto max-w-7xl mt-4">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </div>
          <div>
            <ul className="flex gap-5 font-medium items-center">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/jobs"}>Jobs</Link>
              </li>
              <li>
                <Link to={"/browse"}>Browse</Link>
              </li>
              {authUser ? (
                <>
                  <li>
                    <Popover>
                      <PopoverTrigger>
                        <Avatar>
                          <AvatarImage src={authUser?.profile?.profilePhoto} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 mt-2 bg-[#fefefe]">
                        <div className="flex gap-7 items-center">
                          <Avatar>
                            <AvatarImage
                              src={authUser?.profile?.profilePhoto}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="font-bold"> {authUser?.fullname}</h1>
                            <p> {authUser?.profile?.bio} </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start mt-1">
                          <Link to="/profile">
                            <Button variant="link">
                              <User2 /> &nbsp; View Profile
                            </Button>
                          </Link>
                          <Button variant="link" onClick={logOutHandler}>
                            <LogOut /> &nbsp; Logout
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </li>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <li>
                      <Button variant="outline">Login</Button>
                    </li>
                  </Link>
                  <Link to={"/signup"}>
                    <li>
                      <Button
                        variant="outline"
                        className="bg-[#20B2AA] text-white
                      hover:bg-[#008080] hover:text-white "
                      >
                        Signup
                      </Button>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};
