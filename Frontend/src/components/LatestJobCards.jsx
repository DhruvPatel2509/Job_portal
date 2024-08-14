import React from "react";
import { Badge } from "@/components/ui/badge";

function LatestJobCards() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-700 ">
          Custom IT solutions for software, cybersecurity, and consulting needs.
        </p>
      </div>
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
  );
}

export default LatestJobCards;
