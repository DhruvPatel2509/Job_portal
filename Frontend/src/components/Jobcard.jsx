/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function Jobcard({ job }) {
  const daysAgo = (mongoTime) => {
    const timeDifference = new Date() - new Date(mongoTime);
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const minutes = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 1000)
    );

    if (days < 1) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const navigate = useNavigate();

  return (
    <div className="rounded-md p-5 shadow-xl border border-gray-100">
      {/* Top Section: Job Date and Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{daysAgo(job?.createdAt)}</p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          aria-label="Bookmark Job"
        >
          <Bookmark />
        </Button>
      </div>

      {/* Middle Section: Company Info */}
      <div className="flex flex-col md:flex-row items-center gap-2 my-2">
        <Button variant="outline" className="p-2 md:p-6" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || "default-logo.png"}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div className="text-center md:text-left">
          <h1 className="font-bold text-lg md:text-xl">
            {job?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-600"> {job?.location} </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg md:text-xl my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job?.position} Position
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {job?.salary} LPA
        </Badge>
        <Badge variant="ghost" className="text-purple-800 font-bold">
          {job?.jobType}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
          variant="outline"
          className="w-full md:w-auto"
        >
          Details
        </Button>
        <Button className="bg-purple-800 text-white w-full md:w-auto">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Jobcard;
