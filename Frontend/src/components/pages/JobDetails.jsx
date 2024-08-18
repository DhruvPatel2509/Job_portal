import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
function JobDetails() {
  const isApplied = false;

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const fetchSingleJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getJob/${jobId}`, {
        withCredentials: true,
      });
      console.log(res);

      if (res.data.success) {
        dispatch(setSingleJob(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleJob();
  }, [jobId]);

  const { singleJob } = useSelector((state) => state.job);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title} </h1>
          <div className="flex items-center gap-2 mt-4">
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
          {singleJob?.description}
        </h1>
        <div className="my-4 ">
          <h1 className="font-bold my-1">
            Role :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Location :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Description :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Experience :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experience} years
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Salary :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Total Applicant
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application.length}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Posted Date
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
