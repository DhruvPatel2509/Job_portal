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
    <div className="herosec relative flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center bg-cover bg-center">
      <span className="px-5 py-2 mx-auto font-medium tracking-wide text-[#F83002] bg-white bg-opacity-80 rounded-full shadow-lg">
        Transform Your Career Today
      </span>

      <h1 className="text-4xl font-extrabold leading-snug text-white sm:text-5xl lg:text-6xl">
        Find Your <span className="text-[#6A38C2]">Dream Job</span>{" "}
        <br className="hidden sm:block" />
        in Just a Few Clicks
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-200 sm:text-xl lg:text-2xl">
        Whether you’re starting your career or aiming higher, we connect you to
        opportunities that match your skills and aspirations.
      </p>

      <div className="flex items-center w-full gap-2 px-4 py-2 mx-auto mt-8 bg-white border border-gray-300 rounded-full shadow-xl focus-within:ring-2 focus-within:ring-[#6A38C2] sm:w-[70%] md:w-[60%] lg:w-[40%]">
        <form className="w-full">
          <div className="flex items-center justify-between  gap-2">
            <input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter job title, skills, or company"
              className="w-full p-2 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none sm:text-base"
            />
            <Button
              className="p-3 text-white transition-transform duration-200 ease-in-out transform rounded-full bg-[#6A38C2] hover:bg-[#5a2ca2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A38C2]"
              onClick={searchJobHandler}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
