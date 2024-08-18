import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function Jobcard({ job }) {
  const daysAgo = (mongoTime) => {
    const timeDifference = new Date() - new Date(mongoTime);
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const min = Math.floor(timeDifference / (24 * 60 * 60));

    if (days < 1) {
      return `${min} Minute Ago`;
    } else return `${days} Days Ago`;
  };
  const navigate = useNavigate();
  return (
    <div className="rounded-md p-5 shadow-xl border-gray-100">
      <div className="flex items-center justify-between">
        <p className=" text-sm text-gray-600 ">{daysAgo(job?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2 ">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold">{job?.company?.name}</h1>
          <h1 className="font-bold">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job.position} Position
          {job.position} Position
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {job.salary} LPA
          {job.salary} LPA
        </Badge>
        <Badge variant="ghost" className="text-purple-800 font-bold">
          {job.jobType}
          {job.jobType}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-purple-800 ">Save For Later</Button>
      </div>
    </div>
  );
}

export default Jobcard;
