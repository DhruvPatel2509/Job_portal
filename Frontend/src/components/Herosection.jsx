import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query));
    if (query) {
      navigate("/browse");
    }
  };
  return (
    <>
      <div className="text-center flex flex-col gap-5">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium ">
          No.1 Job Hunt Website
        </span>

        <h1 className="text-5xl font-bold">
          Search , Apply & <br />
          Get Your <span className="text-[#6A38C2] ">Dream Jobs</span>
        </h1>
        <p>
          Discover your next career opportunity with ease; explore a wide range
          of job listings tailored to your skills.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-2 rounded-full items-center gap-4 mx-auto ">
          <input
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Dream Job"
            className="outline-none border-none w-full p-2"
          />
          <Button
            className="rounded-r-full bg-[#6A38C2]"
            onClick={searchJobHandler}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};
