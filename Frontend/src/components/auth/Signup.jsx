import React from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";

export const Signup = () => {

    

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          action=""
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-3 flex flex-col gap-2">
            <Label htmlFor="fullname">Full Name:</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Dhruv Patel"
              name="fullname"
            />
          </div>

          <div className="my-3 flex flex-col gap-2">
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
            />
          </div>

          <div className="my-3 flex flex-col gap-2">
            <Label htmlFor="phonenumber">Phone Number: </Label>
            <Input
              id="phonenumber"
              type="number"
              placeholder="+91"
              name="phonenumber"
            />
          </div>

          <div className="my-3 flex flex-col gap-2">
            <Label htmlFor="password">Password: </Label>
            <Input
              id="password"
              type="password"
              placeholder="minimum 6 characters"
              name="password"
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
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
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
