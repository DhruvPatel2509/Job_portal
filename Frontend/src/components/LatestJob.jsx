import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";

function LatestJob() {
  const { allJobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allJobs?.length === 0 ? (
          <div className="col-span-1 flex flex-col items-center justify-center mb-10">
            <p className="text-xl font-semibold text-gray-800 mb-2 text-center">
              You need to be logged in to see the jobs.
            </p>
            <p className="text-gray-600 mb-4 text-center">
              Please log in to access the latest job opportunities.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#6A38C2] to-[#5a2a9c] text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            ?.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJob;
