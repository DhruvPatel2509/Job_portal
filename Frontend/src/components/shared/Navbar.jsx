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
import { setAllJobs, setSingleJob } from "../../redux/jobSlice";
import { useEffect } from "react";
export const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const parseData = JSON.parse(data);
      dispatch(setAuthUser(parseData));
    }
  }, [dispatch]);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logOut`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSingleJob(null));
        dispatch(setAllJobs(null));
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Show a user-friendly message or notification here
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
    <>
      <div className="bg-[#ffffff] mb-3">
        <div className="flex items-center justify-between mx-auto mt-4 max-w-7xl">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={handleLogo}
          >
            Job<span className="text-[#F83002]">Portal</span>
          </h1>

          <ul className="flex items-center gap-5 font-medium">
            {role === "student" ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            )}
            {authUser ? (
              <li>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage
                        src={
                          authUser?.profile?.profilePhoto ||
                          "default-avatar.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 mt-2 bg-[#fefefe]">
                    <div className="flex items-center gap-7">
                      <Avatar>
                        <AvatarImage
                          src={
                            authUser?.profile?.profilePhoto ||
                            "default-avatar.png"
                          }
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h1 className="font-bold">{authUser?.fullname}</h1>
                        <p>{authUser?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start mt-1">
                      {role === "student" && (
                        <Link to="/profile">
                          <Button variant="link">
                            <User2 /> &nbsp; View Profile
                          </Button>
                        </Link>
                      )}
                      <Button variant="link" onClick={logOutHandler}>
                        <LogOut /> &nbsp; Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <Button
                      variant="outline"
                      className="bg-[#20B2AA] text-white hover:bg-[#008080] hover:text-white"
                    >
                      Signup
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <hr />
    </>
  );
};
