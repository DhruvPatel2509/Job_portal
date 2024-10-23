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
    <div className="flex flex-col items-center gap-6 px-4 text-center">
      <span className="px-5 py-2 mx-auto font-medium tracking-wide text-[#F83002] bg-gray-100 rounded-full">
        No.1 Job Hunt Website
      </span>

      <h1 className="text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
        Search, Apply & <br className="hidden sm:block" />
        Get Your <span className="text-[#6A38C2]">Dream Job</span>
      </h1>
      <p className="max-w-xl mx-auto text-base text-gray-600 sm:text-lg lg:text-xl">
        Discover your next career opportunity with ease. Explore a curated list
        of job openings tailored just for you.
      </p>

      <div className="flex items-center w-full gap-2 px-4 py-2 mx-auto mt-6 border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-[#6A38C2] sm:w-[70%] md:w-[60%] lg:w-[40%]">
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find Your Dream Job"
          className="w-full p-2 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none sm:text-base"
        />
        <Button
          className="p-3 text-white transition-transform duration-200 ease-in-out transform rounded-full bg-[#6A38C2] hover:bg-[#5a2ca2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A38C2]"
          onClick={searchJobHandler}
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
