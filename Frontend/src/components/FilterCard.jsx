import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

function FilterCard() {
  const { allJobs } = useSelector((store) => store.job);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(String(selectedValue)));

    // Cleanup function to reset searchedQuery on unmount
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [selectedValue, dispatch]);

  const getUniqueValues = (key) => {
    const values = allJobs.map((job) => job[key]).filter(Boolean);
    return [...new Set(values.map((value) => value.toLowerCase()))];
  };

  const uniqueTitles = getUniqueValues("title");
  const uniqueLocations = getUniqueValues("location");

  return (
    <div className="w-full p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Title Filter */}
      <div className="mt-4">
        <h2 className="font-semibold text-md">Job Titles</h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          <div className="flex items-center space-x-2 my-2">
            <RadioGroupItem value="" />
            <Label>All Jobs</Label>
          </div>
          {uniqueTitles.map((title, idx) => (
            <div key={idx} className="flex items-center space-x-2 my-2">
              <RadioGroupItem value={title} />
              <Label>{title.charAt(0).toUpperCase() + title.slice(1)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Location Filter */}
      <div className="mt-4">
        <h2 className="font-semibold text-md">Locations</h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          <div className="flex items-center space-x-2 my-2">
            <RadioGroupItem value="" />
            <Label>All Locations</Label>
          </div>
          {uniqueLocations.map((location, idx) => (
            <div key={idx} className="flex items-center space-x-2 my-2">
              <RadioGroupItem value={location} />
              <Label>{location}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCard;
