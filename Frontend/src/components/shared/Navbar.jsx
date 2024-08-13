import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <>
      <div className="bg-[#ffffff]">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </div>
          <div>
            <ul className="flex gap-5 font-medium items-center">
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Jobs</Link>
              </li>
              <li>
                <Link>Browse</Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Popover>
                      <PopoverTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 mt-2 bg-[#fefefe]">
                        <div className="flex gap-7 items-center">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="font-bold">Patel Dhruv</h1>
                            <p>Lorem ipsum dolor sit amet </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start mt-1">
                          <Button variant="link">
                            <User2 /> &nbsp; View Profile
                          </Button>
                          <Button variant="link">
                            <LogOut /> &nbsp; Logout
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button variant="outline">Login</Button>
                  </li>
                  <li>
                    <Button variant="outline">Register</Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
