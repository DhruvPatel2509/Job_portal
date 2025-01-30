import { useSelector } from "react-redux";
import JobCardForAdmin from "./JobCardForAdmin";

const JobAdmin = () => {
  const { allJobs } = useSelector((store) => store.job);

  const handleDetails = (id) => {
    alert(`View details for job ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete job ID: ${id}`);
  };

  return (
    <div className="p-0 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Job Administration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {allJobs.map((job) => (
          <JobCardForAdmin
            key={job._id}
            job={job}
            onDetails={handleDetails}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default JobAdmin;
