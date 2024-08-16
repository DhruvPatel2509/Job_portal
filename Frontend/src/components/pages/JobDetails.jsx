import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function JobDetails() {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              12 Position
            </Badge>
            <Badge variant="ghost" className="text-red-700 font-bold">
              24LPA
            </Badge>
            <Badge variant="ghost" className="text-purple-800 font-bold">
              Full Time
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-red-600"
          }`}
        >
          {isApplied ? <>Applied</> : <> Apply Now</>}
        </Button>
      </div>
      <div>
        <h1 className=" border-b-2 border-b-gray-200 font-medium py-4 ">
          Job Description
        </h1>
        <div className="my-4 ">
          <h1 className="font-bold my-1">
            Role :
            <span className="pl-4 font-normal text-gray-800">
              Frontend Developer
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Location :
            <span className="pl-4 font-normal text-gray-800">Hydrabad</span>
          </h1>

          <h1 className="font-bold my-1">
            Description :
            <span className="pl-4 font-normal text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex,
              repellat.
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Experience :
            <span className="pl-4 font-normal text-gray-800">2 years</span>
          </h1>

          <h1 className="font-bold my-1">
            Salary :
            <span className="pl-4 font-normal text-gray-800">12LPA</span>
          </h1>

          <h1 className="font-bold my-1">
            Total Applicant
            <span className="pl-4 font-normal text-gray-800">5</span>
          </h1>

          <h1 className="font-bold my-1">
            Posted Date
            <span className="pl-4 font-normal text-gray-800">18-08-2024 </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
