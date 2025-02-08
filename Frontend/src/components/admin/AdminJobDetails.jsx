import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useGetSingleJob from "../../hooks/useGetSingleJob";

const AdminJobDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((state) => state.job);

  const { fetchSingleJob } = useGetSingleJob(jobId);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex sm:flex-row justify-between items-start">
        <div className="flex-1">
          <Button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Back
          </Button>
          <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} Position
            </Badge>
            <Badge variant="ghost" className="text-red-700 font-bold">
              {singleJob?.salary} LPA
            </Badge>
            <Badge variant="ghost" className="text-purple-800 font-bold">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="border-b-2 border-b-gray-200 font-medium py-4 text-lg">
          Job Description
        </h1>
        <p className="mt-2 text-gray-700">{singleJob?.description}</p>

        {/* Job Requirements Section */}
        <div className="my-6">
          <h1 className="font-bold text-lg">Job Requirements</h1>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            {singleJob?.requirements?.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="my-4 space-y-2">
          {[
            { label: "Role", value: singleJob?.title },
            { label: "Location", value: singleJob?.location },
            { label: "Experience", value: `${singleJob?.experience} years` },
            { label: "Salary", value: `${singleJob?.salary} LPA` },
            {
              label: "Total Applicants",
              value: singleJob?.application?.length,
            },
            {
              label: "Posted Date",
              value: singleJob?.createdAt?.split("T")[0],
            },
          ].map(({ label, value }) => (
            <h1 className="font-bold" key={label}>
              {label}:{" "}
              <span className="pl-4 font-normal text-gray-800">{value}</span>
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminJobDetails;
