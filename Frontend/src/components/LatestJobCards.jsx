import React from "react";
import { Badge } from "@/components/ui/badge";

function LatestJobCards({ job }) {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg"> {job?.company?.name} </h1>
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2"> {job.title} </h1>
        <p className="text-sm text-gray-700 ">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job.position} Position
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {job.salary} LPA
        </Badge>
        <Badge variant="ghost" className="text-purple-800 font-bold">
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
