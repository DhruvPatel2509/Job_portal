/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  // Destructure job properties
  const { _id, company, title, description, position, salary, jobType } = job;

  return (
    <div
      onClick={() => navigate(`/jobs/jobDetails/${_id}`)}
      role="button"
      aria-label={`View details for ${title} at ${company?.name}`}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{company?.name}</h1>
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{title}</h1>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {position} Position
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          {salary} LPA
        </Badge>
        <Badge variant="ghost" className="text-purple-800 font-bold">
          {jobType}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
