import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Mumbai",
      "Delhi",
      "Bengaluru",
      "Kolkata",
      "Chennai",
      "Hyderabad",
      "Ahmedabad",
      "Pune",
      "Jaipur",
      "Surat",
    ],
  },

  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic Designer",
      "FullStack Developer",
    ],
  },

  {
    filterType: "Salary",
    array: ["0-40k", "40k-1lac", "1lac-2lac", "2lac-5lac", "5lac+"],
  },
];

function FilterCard() {
  return (
    <>
      <div className="w-full p-3 rounded-md">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3 " />
        <RadioGroup>
          {filterData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-md">{data.filterType}</h1>
              {data.array.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item}></RadioGroupItem>
                  <Label>{item}</Label>
                </div>
              ))}
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}

export default FilterCard;
