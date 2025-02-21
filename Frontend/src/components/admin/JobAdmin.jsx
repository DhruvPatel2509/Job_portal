import { useDispatch, useSelector } from "react-redux";
import JobCardForAdmin from "./JobCardForAdmin";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { toast } from "sonner";
import { useState } from "react";
import { setApiLoading } from "../../redux/authSlice";

const JobAdmin = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const [jobs, setJobs] = useState(allJobs);
  const dispatch = useDispatch();

  const handleDetails = (id) => {
    navigate(`/admin/jobdetails/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = `${JOB_API_END_POINT}/deleteJob/${id}`;

      const res = await apiRequest("DELETE", endpoint, {}, token,dispatch);

      if (res.status === 200) {
        toast.success("Job Deleted Successfully");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className="p-0 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Job Administration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {jobs?.map((job) => (
          <JobCardForAdmin
            key={job._id}
            job={job} // ✅ Pass the entire job object
            onDetails={() => handleDetails(job._id)}
            onDelete={() => handleDelete(job._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobAdmin;
